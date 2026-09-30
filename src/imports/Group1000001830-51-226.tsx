import svgPaths from "./svg-ex1d4c4i33";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";

function Helper1X1BrickBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-0 size-[81.51px] top-0">
      <div className="absolute inset-0 shadow-[3.396px_6.793px_13.585px_0px_rgba(0,0,0,0.38)]">
        <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.698px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1.698px_-1.698px_0px_0px_rgba(0,0,0,0.08),inset_1.698px_1.698px_0px_0px_rgba(255,255,255,0.12)]" />
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
    <div className="h-[74.805px] relative shrink-0 w-[60px]">
      <div className="absolute left-0 size-[66.995px] top-0" data-name="1x1 brick">
        <div className="absolute inset-0 shadow-[2.791px_5.583px_11.166px_0px_rgba(0,0,0,0.38)]" data-name="brick">
          <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.396px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1.396px_-1.396px_0px_0px_rgba(0,0,0,0.08),inset_1.396px_1.396px_0px_0px_rgba(255,255,255,0.12)]" />
        </div>
        <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
          <div className="absolute bg-[#c9c9c9] inset-0" data-name="color" />
        </div>
      </div>
      <p className="absolute font-['Holtwood_One_SC:Regular',sans-serif] leading-[40.197px] left-[21px] not-italic text-[#919191] text-[26.798px] top-[12.47px] tracking-[-0.3958px] uppercase">{text}</p>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#128a74] h-[18px] left-0 rounded-[22.332px] top-[39px] w-[124.135px]" />
      <div className="absolute content-stretch flex gap-[50px] h-[96px] items-center left-[36.51px] top-0 w-[707.49px]">
        <div className="content-stretch flex flex-col gap-[11.166px] h-[91.013px] items-start px-[31.264px] py-[15.632px] relative shrink-0 w-[73px]">
          <Helper1X1BrickBackgroundImage>
            <div className="absolute bg-[#128a74] inset-0" data-name="color" />
          </Helper1X1BrickBackgroundImage>
          <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[48.906px] not-italic relative shrink-0 text-[36.847px] text-white tracking-[-0.4816px] uppercase">1</p>
        </div>
        <div className="content-stretch flex flex-col gap-[11.166px] h-[91.013px] items-start px-[27.915px] py-[15.632px] relative shrink-0 w-[73px]">
          <Helper1X1BrickBackgroundImage>
            <div className="absolute bg-[#fdc73e] inset-0" data-name="color" />
          </Helper1X1BrickBackgroundImage>
          <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[48.906px] not-italic relative shrink-0 text-[36.847px] text-black tracking-[-0.4816px] uppercase">2</p>
        </div>
        <BackgroundImageAndText text="3" />
        <BackgroundImageAndText text="4" />
        <BackgroundImageAndText text="5" />
        <BackgroundImageAndText text="6" />
        <BackgroundImageAndText text="7" />
        <BackgroundImageAndText text="8" />
        <BackgroundImageAndText text="9" />
        <div className="h-[96px] relative shrink-0 w-[77px]" data-name="Trophy">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 96">
            <g clipPath="url(#clip0_48_1882)" id="Trophy">
              <path d={svgPaths.p165fd180} fill="var(--fill-0, #EDA900)" id="Vector" />
              <path d={svgPaths.p1365c000} fill="var(--fill-0, #4B45CE)" id="Vector_2" />
              <path d={svgPaths.p1cb46b00} fill="var(--fill-0, #4B45CE)" id="Vector_3" />
              <path d={svgPaths.p2e7e3200} fill="var(--fill-0, #4442AA)" id="Vector_4" />
              <path d={svgPaths.p3b7f2400} fill="var(--fill-0, #817FE0)" id="Vector_5" />
              <path d={svgPaths.p2886df00} fill="var(--fill-0, #E36414)" id="Vector_6" />
              <path d={svgPaths.p36a0da80} fill="var(--fill-0, #F8961E)" id="Vector_7" />
              <path d={svgPaths.p399a6a00} fill="var(--fill-0, #F8D707)" id="Vector_8" />
              <path d={svgPaths.p14697400} fill="var(--fill-0, #4442AA)" id="Vector_9" />
              <path d={svgPaths.p387ce300} fill="var(--fill-0, #817FE0)" id="Vector_10" />
              <path d={svgPaths.p3b9b96c0} fill="var(--fill-0, #F8D707)" id="Vector_11" />
              <path d={svgPaths.p29cf0e00} fill="var(--fill-0, #EDA900)" id="Vector_12" />
              <path d={svgPaths.p2ce41380} fill="var(--fill-0, #F8D707)" id="Vector_13" />
              <path d={svgPaths.p2f584e00} fill="var(--fill-0, #FFFA5A)" id="Vector_14" />
              <path d={svgPaths.p339ed370} fill="var(--fill-0, #FFFA5A)" id="Vector_15" />
              <path d={svgPaths.p1e41b380} fill="var(--fill-0, #FFFA5A)" id="Vector_16" />
              <path d={svgPaths.p15e0ef00} fill="var(--fill-0, #F8D707)" id="Vector_17" />
              <path d={svgPaths.p318bfa80} fill="var(--fill-0, #F8D707)" id="Vector_18" />
              <path d={svgPaths.p25d98e00} fill="var(--fill-0, #F8961E)" id="Vector_19" />
            </g>
            <defs>
              <clipPath id="clip0_48_1882">
                <rect fill="white" height="96" width="77" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}