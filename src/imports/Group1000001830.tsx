import svgPaths from "./svg-74p287bqdj";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";

function Helper1X1BrickBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-0 size-[73px] top-0">
      <div className="absolute inset-0 shadow-[3.042px_6.083px_12.167px_0px_rgba(0,0,0,0.38)]">
        <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.521px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1.521px_-1.521px_0px_0px_rgba(0,0,0,0.08),inset_1.521px_1.521px_0px_0px_rgba(255,255,255,0.12)]" />
      </div>
      <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
        {children}
      </div>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="relative shrink-0 size-[60px]">
      <div className="absolute left-0 size-[60px] top-0" data-name="1x1 brick">
        <div className="absolute inset-0 shadow-[2.5px_5px_10px_0px_rgba(0,0,0,0.38)]" data-name="brick">
          <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.25px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1.25px_-1.25px_0px_0px_rgba(0,0,0,0.08),inset_1.25px_1.25px_0px_0px_rgba(255,255,255,0.12)]" />
        </div>
        <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
          <div className="absolute bg-[#c9c9c9] inset-0" data-name="color" />
        </div>
      </div>
      <p className="absolute font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] left-[21px] not-italic text-[#919191] text-[24px] top-[10px] tracking-[-0.3545px] uppercase">{text}</p>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#128a74] h-[13px] left-0 rounded-[20px] top-[32px] w-[138px]" />
      <div className="absolute content-stretch flex items-center justify-between left-[45px] top-0 w-[872px]">
        <div className="content-stretch flex flex-col gap-[10px] items-start px-[28px] py-[14px] relative shrink-0 size-[73px]">
          <Helper1X1BrickBackgroundImage>
            <div className="absolute bg-[#128a74] inset-0" data-name="color" />
          </Helper1X1BrickBackgroundImage>
          <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[43.8px] not-italic relative shrink-0 text-[33px] text-white tracking-[-0.4313px] uppercase">1</p>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start px-[25px] py-[14px] relative shrink-0 size-[73px]">
          <Helper1X1BrickBackgroundImage>
            <div className="absolute bg-[#fdc73e] inset-0" data-name="color" />
          </Helper1X1BrickBackgroundImage>
          <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[43.8px] not-italic relative shrink-0 text-[33px] text-black tracking-[-0.4313px] uppercase">2</p>
        </div>
        <BackgroundImageAndText text="3" />
        <BackgroundImageAndText text="4" />
        <BackgroundImageAndText text="5" />
        <BackgroundImageAndText text="6" />
        <BackgroundImageAndText text="7" />
        <BackgroundImageAndText text="8" />
        <BackgroundImageAndText text="9" />
        <div className="relative shrink-0 size-[77px]" data-name="Trophy">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g clipPath="url(#clip0_18_1006)" id="Trophy">
              <path d={svgPaths.p287cee00} fill="var(--fill-0, #EDA900)" id="Vector" />
              <path d={svgPaths.p309e2600} fill="var(--fill-0, #4B45CE)" id="Vector_2" />
              <path d={svgPaths.p14d3980} fill="var(--fill-0, #4B45CE)" id="Vector_3" />
              <path d={svgPaths.p137da980} fill="var(--fill-0, #4442AA)" id="Vector_4" />
              <path d={svgPaths.p1b7ddb80} fill="var(--fill-0, #817FE0)" id="Vector_5" />
              <path d={svgPaths.p39a6d680} fill="var(--fill-0, #E36414)" id="Vector_6" />
              <path d={svgPaths.p384f2c00} fill="var(--fill-0, #F8961E)" id="Vector_7" />
              <path d={svgPaths.p1f36f400} fill="var(--fill-0, #F8D707)" id="Vector_8" />
              <path d={svgPaths.p36236400} fill="var(--fill-0, #4442AA)" id="Vector_9" />
              <path d={svgPaths.p15579400} fill="var(--fill-0, #817FE0)" id="Vector_10" />
              <path d={svgPaths.p3b765700} fill="var(--fill-0, #F8D707)" id="Vector_11" />
              <path d={svgPaths.p575700} fill="var(--fill-0, #EDA900)" id="Vector_12" />
              <path d={svgPaths.p6efb780} fill="var(--fill-0, #F8D707)" id="Vector_13" />
              <path d={svgPaths.p30af71a0} fill="var(--fill-0, #FFFA5A)" id="Vector_14" />
              <path d={svgPaths.p1ba9fa00} fill="var(--fill-0, #FFFA5A)" id="Vector_15" />
              <path d={svgPaths.p5547900} fill="var(--fill-0, #FFFA5A)" id="Vector_16" />
              <path d={svgPaths.p1cfca000} fill="var(--fill-0, #F8D707)" id="Vector_17" />
              <path d={svgPaths.p35c07800} fill="var(--fill-0, #F8D707)" id="Vector_18" />
              <path d={svgPaths.p1ebcad00} fill="var(--fill-0, #F8961E)" id="Vector_19" />
            </g>
            <defs>
              <clipPath id="clip0_18_1006">
                <rect fill="white" height="77" width="77" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}