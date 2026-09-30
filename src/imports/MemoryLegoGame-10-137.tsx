import clsx from "clsx";
import imgT0 from "figma:asset/146c390e1b63d4c79632e32c4e94cd8a356fca5d.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-0 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.38)]">
        <div className="absolute bg-size-[48px_48px] bg-top-left border border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_-1px_0px_0px_rgba(0,0,0,0.08),inset_1px_1px_0px_0px_rgba(255,255,255,0.12)]" />
      </div>
      <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
        {children}
      </div>
    </div>
  );
}
type Helper1X1BrickBackgroundImage2Props = {
  additionalClassNames?: string;
};

function Helper1X1BrickBackgroundImage2({ additionalClassNames = "" }: Helper1X1BrickBackgroundImage2Props) {
  return (
    <BackgroundImage additionalClassNames={clsx("absolute left-[37px] size-[48px]", additionalClassNames)}>
      <div className="absolute bg-[#fdc73e] inset-0" data-name="color" />
    </BackgroundImage>
  );
}
type Helper1X1BrickBackgroundImage1Props = {
  additionalClassNames?: string;
};

function Helper1X1BrickBackgroundImage1({ additionalClassNames = "" }: Helper1X1BrickBackgroundImage1Props) {
  return (
    <BackgroundImage additionalClassNames={clsx("absolute size-[48px] top-[366px]", additionalClassNames)}>
      <div className="absolute bg-[#5851ee] inset-0" data-name="color" />
    </BackgroundImage>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ParagraphBackgroundImageAndText({ text, additionalClassNames = "" }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[16px] items-center left-[13px] w-[107.109px]", additionalClassNames)}>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#314158] text-[14px]">{text}</p>
    </div>
  );
}
type Helper1X1BrickBackgroundImageProps = {
  additionalClassNames?: string;
};

function Helper1X1BrickBackgroundImage({ additionalClassNames = "" }: Helper1X1BrickBackgroundImageProps) {
  return (
    <BackgroundImage additionalClassNames={clsx("absolute size-[48px]", additionalClassNames)}>
      <div className="absolute bg-[#ef3f54] inset-0" data-name="color" />
    </BackgroundImage>
  );
}
type PerspectiveGridBackgroundImageProps = {
  additionalClassNames?: string;
};

function PerspectiveGridBackgroundImage({ additionalClassNames = "" }: PerspectiveGridBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[915.232px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 916.452 916.452">
        <g id="Perspective Grid">
          <path d="M0.609966 0.609966V915.842" id="Vector" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M48.7806 0.609966V915.842" id="Vector_2" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M96.9506 0.609966V915.842" id="Vector_3" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M145.12 0.609966V915.842" id="Vector_4" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M193.29 0.609966V915.842" id="Vector_5" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M241.461 0.609966V915.842" id="Vector_6" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M289.631 0.609966V915.842" id="Vector_7" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M337.801 0.609966V915.842" id="Vector_8" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M385.971 0.609966V915.842" id="Vector_9" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M434.141 0.609966V915.842" id="Vector_10" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M482.312 0.609966V915.842" id="Vector_11" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M530.482 0.609966V915.842" id="Vector_12" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M578.652 0.609966V915.842" id="Vector_13" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M626.821 0.609966V915.842" id="Vector_14" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M674.992 0.609966V915.842" id="Vector_15" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M723.162 0.609966V915.842" id="Vector_16" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M771.332 0.609966V915.842" id="Vector_17" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M819.502 0.609966V915.842" id="Vector_18" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M867.672 0.609966V915.842" id="Vector_19" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M915.842 0.609966V915.842" id="Vector_20" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 0.609966H915.842" id="Vector_21" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 48.7801H915.842" id="Vector_22" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 96.9502H915.842" id="Vector_23" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 145.12H915.842" id="Vector_24" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 193.291H915.842" id="Vector_25" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 241.461H915.842" id="Vector_26" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 289.631H915.842" id="Vector_27" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 337.801H915.842" id="Vector_28" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 385.971H915.842" id="Vector_29" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 434.141H915.842" id="Vector_30" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 482.311H915.842" id="Vector_31" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 530.481H915.842" id="Vector_32" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 578.651H915.842" id="Vector_33" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 626.822H915.842" id="Vector_34" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 674.992H915.842" id="Vector_35" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 723.162H915.842" id="Vector_36" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 771.332H915.842" id="Vector_37" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 819.502H915.842" id="Vector_38" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 867.672H915.842" id="Vector_39" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
          <path d="M0.609966 915.842H915.842" id="Vector_40" stroke="var(--stroke-0, #B3B3B3)" strokeOpacity="0.3" strokeWidth="1.21993" />
        </g>
      </svg>
    </div>
  );
}

export default function MemoryLegoGame() {
  return (
    <div className="bg-white relative size-full" data-name="Memory Lego Game">
      <div className="absolute h-[993px] left-0 overflow-clip top-0 w-[1679px]" data-name="T0">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#f1f5f9] inset-0" />
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgT0} />
        </div>
        <PerspectiveGridBackgroundImage additionalClassNames="left-[-397px] top-[-55px]" />
        <PerspectiveGridBackgroundImage additionalClassNames="left-[1301px] top-[65px]" />
        <div className="absolute h-[742px] left-[199.5px] top-[125.5px] w-[1280px]" data-name="Main Content">
          <div className="absolute content-stretch flex items-start justify-center left-0 top-0 w-[1280px]" data-name="Container">
            <div className="h-[742px] relative shrink-0 w-[1152px]" data-name="Container">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="-translate-x-1/2 absolute h-[96px] left-[calc(50%+0.5px)] top-[-29.5px] w-[384px]" data-name>
                  <div className="absolute contents left-0 top-0">
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-0 top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[48px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[96px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[144px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[192px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[240px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[288px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[336px] top-[48px]" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-0 top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[48px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[96px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[144px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[192px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[240px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[288px] top-0" />
                    <Helper1X1BrickBackgroundImage additionalClassNames="left-[336px] top-0" />
                  </div>
                  <div className="-translate-y-1/2 absolute bg-[rgba(153,0,0,0.63)] content-stretch flex h-[36px] items-center justify-center left-[63px] top-1/2 w-[258px]" data-name="Text">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[-0.3545px] uppercase">
                      <span className="font-['Inter:Bold',sans-serif] font-bold leading-[36px]">MEMORIZE</span>
                      <span className="leading-[36px]">{`: `}</span>
                      <span className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px]">4s</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[110px] items-start left-[1465px] top-[256px] w-[134px]" data-name="Container">
          <div className="bg-[rgba(255,255,255,0.9)] h-[97px] relative rounded-[14px] shrink-0 w-[133px]" data-name="Container">
            <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
            <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
              <div className="absolute h-[15px] left-[13px] top-[13px] w-[107.109px]" data-name="Paragraph">
                <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-0 not-italic text-[#62748e] text-[16px] top-0 tracking-[1.1172px] uppercase">Controls</p>
              </div>
              <ParagraphBackgroundImageAndText text="Orbit: Left Click" additionalClassNames="top-[39px]" />
              <ParagraphBackgroundImageAndText text="Zoom: Scroll" additionalClassNames="top-[66px]" />
            </div>
          </div>
        </div>
        <Helper1X1BrickBackgroundImage1 additionalClassNames="left-[1436px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="left-[1484px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="left-[1532px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="left-[1580px]" />
        <Helper1X1BrickBackgroundImage2 additionalClassNames="top-[330px]" />
        <Helper1X1BrickBackgroundImage2 additionalClassNames="top-[379px]" />
        <Helper1X1BrickBackgroundImage2 additionalClassNames="top-[428px]" />
      </div>
      <Helper1X1BrickBackgroundImage additionalClassNames="left-[422px] top-[89px]" />
      <Helper1X1BrickBackgroundImage additionalClassNames="left-[422px] top-[138px]" />
    </div>
  );
}