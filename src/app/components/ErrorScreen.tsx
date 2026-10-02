import { Component, type ReactNode } from "react";

/* Shown instead of a silent failure when something breaks — a crash while
   rendering, or an error in a tap handler (React doesn't catch those, so the
   screen would just stay put and "nothing happens"). Players see a friendly
   message; the technical details only travel in "Send report" (share sheet,
   or copied to the clipboard where sharing isn't available). */

// Harmless browser noise that shouldn't take over the screen
const IGNORED = [/ResizeObserver loop/i, /play\(\) (request|failed)/i, /NotAllowedError/i, /AbortError/i];

interface State { error: { message: string; stack?: string } | null; reportNote: string | null }

const isGraphicsError = (message: string) => /WebGL|3D graphics/i.test(message);

export class ErrorScreen extends Component<{ children: ReactNode }, State> {
  state: State = { error: null, reportNote: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error: describe(error) };
  }

  componentDidMount() {
    window.addEventListener("error", this.onError);
    window.addEventListener("unhandledrejection", this.onRejection);
  }
  componentWillUnmount() {
    window.removeEventListener("error", this.onError);
    window.removeEventListener("unhandledrejection", this.onRejection);
  }

  private onError = (event: ErrorEvent) => this.show(event.error ?? event.message);
  private onRejection = (event: PromiseRejectionEvent) => this.show(event.reason);
  private show(error: unknown) {
    const described = describe(error);
    if (IGNORED.some(re => re.test(described.message))) return;
    if (!this.state.error) this.setState({ error: described });
  }

  componentDidUpdate() {
    // The pause button lives outside React (index.html); keep it off this screen
    const pause = document.getElementById("global-pause-btn");
    if (this.state.error && pause) pause.style.display = "none";
  }

  private report() {
    const { error } = this.state;
    if (!error) return "";
    return [
      "Stack It problem report",
      error.message,
      ...(error.stack ? error.stack.split("\n").slice(1, 6) : []),
      `Page: ${location.href}`,
      `Device: ${navigator.userAgent}`,
      `Screen: ${innerWidth}×${innerHeight} @${devicePixelRatio}x`,
    ].join("\n");
  }

  private sendReport = async () => {
    const text = this.report();
    try {
      if (navigator.share) { await navigator.share({ title: "Stack It problem report", text }); return; }
      await navigator.clipboard.writeText(text);
      this.setState({ reportNote: "Report copied. Paste it in a message to us." });
    } catch {
      // Share sheet dismissed, or clipboard blocked: nothing else to do
    }
  };

  render() {
    const { error, reportNote } = this.state;
    if (!error) return this.props.children;
    const graphics = isGraphicsError(error.message);
    const button: React.CSSProperties = {
      width: "100%", padding: "14px 0 18px", border: "none", borderRadius: 14, cursor: "pointer",
      fontFamily: "'Holtwood One SC', serif", fontSize: 18,
    };
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 2147483647, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, background: "#9db4e3", fontFamily: "Inter, system-ui, sans-serif",
      }}>
        <div style={{ width: "min(420px, 100%)", background: "white", borderRadius: 20, padding: "24px 22px", boxShadow: "0 18px 40px rgba(0,0,0,0.25)" }}>
          <div style={{ fontFamily: "'Holtwood One SC', serif", fontSize: 22, color: "#1d293d" }}>
            {graphics ? "Can't load the bricks" : "Oops, something broke"}
          </div>
          <p style={{ margin: "10px 0 18px", fontSize: 15, lineHeight: 1.45, color: "#475569" }}>
            {graphics
              ? "Your browser couldn't start the 3D view. Updating Chrome usually fixes it."
              : "Sorry about that. Try again, and if it keeps happening, send us a report."}
          </p>
          <button onClick={() => window.location.reload()} style={{ ...button, background: "#ef3f54", boxShadow: "inset 0 -5px 0 #aa0418", color: "white" }}>
            Try again
          </button>
          <button onClick={this.sendReport} style={{ ...button, marginTop: 10, background: "#f1f5f9", boxShadow: "inset 0 -5px 0 #cbd5e1", color: "#475569" }}>
            Send report
          </button>
          {reportNote && <p style={{ margin: "12px 0 0", fontSize: 13, color: "#16a34a", textAlign: "center" }}>{reportNote}</p>}
        </div>
      </div>
    );
  }
}

function describe(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error) return { message: `${error.name}: ${error.message}`, stack: error.stack };
  return { message: String(error) };
}
