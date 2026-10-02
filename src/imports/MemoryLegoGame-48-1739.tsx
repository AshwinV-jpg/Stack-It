import clsx from "clsx";
import svgPaths from "./svg-ffmzbzj7e1";
import imgT0 from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.jpg";
import img1X1Brick from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
import imgCanvas from "figma:asset/06f6beaf4824ad3bfbb53a6cd73973d03e08b130.png";
import imgImage38 from "figma:asset/68316724c4c9a152eb5942863bab06865625449b.png";
import imgCanvas1 from "figma:asset/9cf0ac7b5135cc6eb8513210a570728ccc4a9384.png";

function Helper1X1BrickBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-0 size-[81.51px] top-0">
      <div className="absolute inset-0 shadow-[3.396px_6.793px_13.585px_0px_rgba(0,0,0,0.38)]">
        <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.698px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${img1X1Brick}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1.698px_-1.698px_0px_0px_rgba(0,0,0,0.08),inset_1.698px_1.698px_0px_0px_rgba(255,255,255,0.12)]" />
      </div>
      <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
        {children}
      </div>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("h-[307.272px] w-[498.628px]", additionalClassNames)}>
      <div className="absolute inset-[-0.33%_-0.11%_-0.37%_-0.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 500.932 309.437">
          {children}
        </svg>
      </div>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[12.87px] relative shrink-0 w-[55.575px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Black',sans-serif] font-black leading-[12.87px] left-[28.34px] not-italic text-[#5851ee] text-[32px] text-center top-0 tracking-[-0.2463px] uppercase">{text}</p>
      </div>
    </div>
  );
}

function CanvasBackgroundImage() {
  return (
    <div className="h-[115px] relative shrink-0 w-[113px]">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[124.04%] left-[-12.48%] max-w-none top-[-15.77%] w-[126.23%]" src={imgCanvas1} />
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
          <div className="absolute bg-size-[48px_48px] bg-top-left border-[1.396px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${img1X1Brick}')` }} />
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
type Group10000018251X1BrickBackgroundImageProps = {
  additionalClassNames?: string;
};

function Group10000018251X1BrickBackgroundImage({ additionalClassNames = "" }: Group10000018251X1BrickBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[48px]", additionalClassNames)}>
      <div className="absolute inset-0 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.38)]" data-name="brick">
        <div className="absolute bg-size-[48px_48px] bg-top-left border border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${img1X1Brick}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_-1px_0px_0px_rgba(0,0,0,0.08),inset_1px_1px_0px_0px_rgba(255,255,255,0.12)]" />
      </div>
      <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
        <div className="absolute bg-[#5851ee] inset-0" data-name="color" />
      </div>
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
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,0,0,0.2)] h-[894px] left-[calc(50%-364.5px)] rounded-[16px] top-[calc(50%+0.5px)] w-[850px]" data-name="Container">
          <div className="content-stretch flex flex-col items-center justify-between overflow-clip px-[24px] py-[30px] relative rounded-[inherit] size-full">
            <div className="h-[96px] relative shrink-0 w-[384px]" data-name>
              <div className="absolute contents left-0 top-0">
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-0 top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[48px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[96px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[144px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[192px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[240px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[288px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[336px] top-[48px]" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-0 top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[48px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[96px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[144px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[192px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[240px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[288px] top-0" />
                <Group10000018251X1BrickBackgroundImage additionalClassNames="left-[336px] top-0" />
              </div>
              <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(59,21,132,0.7)] content-stretch flex h-[49px] items-center justify-center left-1/2 top-[calc(50%+0.5px)] w-[258px]" data-name="Text">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.3545px] uppercase w-[195px] whitespace-pre-wrap">
                  <span className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] text-[26px]">Timer:</span>
                  <span className="leading-[36px] text-[30px]">{` `}</span>
                  <span className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] text-[48px]">4s</span>
                </p>
              </div>
            </div>
            <div className="h-[578px] overflow-clip relative shrink-0 w-full" data-name="Canvas">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[201.82%] left-[-80.23%] max-w-none top-[-62.07%] w-[260.95%]" src={imgCanvas} />
              </div>
              <BackgroundImage additionalClassNames="absolute left-[151.27px] top-[115.92px]">
                <path d={svgPaths.p1c1ac000} id="Vector 211" stroke="var(--stroke-0, white)" strokeWidth="1.83995" />
              </BackgroundImage>
              <div className="absolute contents h-[473.924px] left-[45.96px] top-[52.31px] w-[708.805px]">
                <div className="absolute flex h-[417.827px] items-center justify-center left-[63.32px] top-[80.35px] w-[674.09px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
                  <div className="flex-none rotate-[0.09deg]">
                    <div className="h-[416.75px] relative w-[673.423px]">
                      <div className="absolute inset-[-0.13%_-0.14%_-0.15%_-0.14%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 675.328 417.93">
                          <path d={svgPaths.p17924200} fill="var(--fill-0, #F1F5F9)" id="Vector 210" stroke="var(--stroke-0, black)" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute flex h-[308.07px] items-center justify-center left-[149.92px] top-[114.53px] w-[499.119px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
                  <div className="flex-none rotate-[0.09deg]">
                    <BackgroundImage additionalClassNames="relative">
                      <g id="Vector 211">
                        <path d={svgPaths.p18ecfe00} fill="var(--fill-0, #F1F5F9)" />
                        <path d={svgPaths.p2fefde80} stroke="var(--stroke-0, #B5B5B5)" strokeWidth="1.83995" />
                      </g>
                    </BackgroundImage>
                  </div>
                </div>
              </div>
              <div className="absolute h-[290.213px] left-[65.05px] top-[245.26px] w-[672.315px]">
                <div className="absolute inset-[-0.9%_-0.2%_-0.22%_-0.11%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 674.453 293.468">
                    <g id="Vector 212">
                      <path d={svgPaths.p2eb78bc0} fill="var(--fill-0, #D9D9D9)" />
                      <path d={svgPaths.p1971b00} fill="var(--stroke-0, black)" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="h-[96px] relative shrink-0 w-[342px]" data-name="Button Design">
              <div className="absolute bg-[#aa0418] h-[72px] left-0 rounded-[20px] top-[24px] w-[342px]" />
              <div className="-translate-x-1/2 absolute bg-[#ef3f54] h-[80px] left-1/2 overflow-clip rounded-[20px] top-0 w-[342px]">
                <div className="absolute h-[80px] left-0 overflow-clip top-0 w-[342px]">
                  <div className="-translate-x-1/2 absolute content-stretch flex gap-[24px] items-center left-[calc(50%+0.09px)] top-[24px]">
                    <div className="relative shrink-0 size-[32px]" data-name="Icon">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                        <g id="Icon">
                          <path d="M8 4L26.6667 16L8 28V4Z" fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                        </g>
                      </svg>
                    </div>
                    <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[26px] text-white tracking-[-0.3545px] uppercase">SUBMIT BUILD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
        </div>
        <div className="absolute h-[333px] left-[1084px] top-[174px] w-[426px]" data-name="image 38">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[114.11%] left-0 max-w-none top-0 w-[99.88%]" src={imgImage38} />
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[284px] h-[944px] items-start leading-[0] left-[915px] overflow-clip top-[49px] w-[744px]">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full">
          <div className="bg-[#128a74] col-1 h-[18px] ml-0 mt-[39px] rounded-[22.332px] row-1 w-[124.135px]" />
          <div className="col-1 content-stretch flex gap-[50px] h-[96px] items-center ml-[36.51px] mt-0 relative row-1 w-[707.49px]">
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
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
          <div className="col-1 h-[583px] ml-0 mt-0 overflow-clip relative row-1 w-[753px]" data-name="image 34 [Vectorized]">
            <div className="absolute inset-[0.33%_1.19%_-4.57%_1.56%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 732.298 607.733">
                <path d={svgPaths.p3c3bd300} fill="var(--fill-0, #FEE642)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4" />
              </svg>
            </div>
            <div className="absolute inset-[0.33%_1.19%_65.94%_1.57%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 732.248 196.639">
                <path d={svgPaths.p1367d100} fill="var(--fill-0, #FCCF28)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4" />
              </svg>
            </div>
            <div className="absolute inset-[23.61%_3.56%_66.02%_1.91%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 711.755 60.4286">
                <path d={svgPaths.p22dafc70} fill="var(--fill-0, #FAB818)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[23.67%_78.84%_66.02%_1.91%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144.946 60.1269">
                <path d={svgPaths.p2be7d1c0} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[23.94%_10.62%_70.64%_88.69%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.19273 31.6407">
                <path d={svgPaths.p3d372100} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[0.33%_60.93%_90.01%_25.46%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 102.439 56.3373">
                <path d={svgPaths.p3e799580} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[0.33%_63.12%_95.53%_25.46%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.978 24.1662">
                <path d={svgPaths.p39e6480} fill="var(--fill-0, #FCCF28)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[1.98%_72.34%_95.98%_25.46%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5724 11.8794">
                <path d={svgPaths.p246c5700} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.22%_65.67%_90.01%_25.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.4795 39.4574">
                <path d={svgPaths.p2646bc00} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.22%_72.2%_90.72%_25.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3464 35.3153">
                <path d={svgPaths.p29525800} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[8.64%_73.02%_90.72%_25.99%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.45091 3.71956">
                <path d={svgPaths.p317b0900} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[9.56%_65.48%_90.01%_31.27%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4726 2.50489">
                <path d={svgPaths.p1789ff00} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[13.01%_35.09%_76.96%_1.57%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476.989 58.4714">
                <path d={svgPaths.p2b71f1f0} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[13.01%_95.71%_76.96%_1.57%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5048 58.4714">
                <path d={svgPaths.pb604800} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[13.01%_97.03%_76.96%_1.57%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5436 58.4714">
                <path d={svgPaths.p2d0ff100} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.51%_3.63%_76.23%_1.89%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 711.384 7.33104">
                <path d={svgPaths.p1553cf80} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.8%_3.63%_76.25%_5.06%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 687.576 5.56142">
                <path d={svgPaths.p96c1280} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.89%_59.45%_76.23%_1.89%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291.102 5.12183">
                <path d={svgPaths.p3451e00} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.97%_90.12%_76.23%_1.89%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.1528 4.65119">
                <path d={svgPaths.p21a49fc0} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.89%_90.98%_76.53%_2.65%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.9619 3.34341">
                <path d={svgPaths.p10e2ee80} fill="var(--fill-0, #FEF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[0.37%_36.93%_89.89%_44.29%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141.388 56.8329">
                <path d={svgPaths.p3e7680} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[0.37%_44.3%_95.26%_44.29%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.9157 25.5201">
                <path d={svgPaths.p3b0ffd00} fill="var(--fill-0, #FCCF28)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.81%_48.34%_95.26%_45.79%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.1798 5.41005">
                <path d={svgPaths.p1e4b0000} fill="var(--fill-0, #FEF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[1.99%_53.54%_95.87%_44.29%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3453 12.4887">
                <path d={svgPaths.p277c4100} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[5.33%_42.88%_91.32%_55.7%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6623 19.5349">
                <path d={svgPaths.p110b2200} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[9.58%_46.59%_90%_49.75%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5812 2.44035">
                <path d={svgPaths.p26e88f80} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[2.73%_23.52%_89.88%_64.34%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.4282 43.0639">
                <path d={svgPaths.p3e4eec00} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[4.34%_32.83%_90.26%_64.34%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3464 31.4526">
                <path d={svgPaths.pe321a00} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[9.51%_27.68%_90.01%_65.89%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.4113 2.76962">
                <path d={svgPaths.p1dcd5100} fill="var(--fill-0, #FEF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[1.95%_74.41%_90.03%_10.07%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116.899 46.7871">
                <path d={svgPaths.p158974f0} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[5%_80.04%_91.3%_18.19%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3896 21.5995">
                <path d={svgPaths.p1bce7580} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[9.49%_84.15%_90.03%_10.07%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.5701 2.78507">
                <path d={svgPaths.p16cae800} fill="var(--fill-0, #FEF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[13.12%_2.53%_85.92%_52.42%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 339.197 5.56468">
                <path d={svgPaths.p1b7e2b80} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[13.21%_1.19%_65.94%_14.3%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 636.356 121.56">
                <path d={svgPaths.p21e6470} fill="var(--fill-0, #F1B828)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.05%_15.8%_90.14%_81.65%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2133 39.6666">
                <path d={svgPaths.p3fda2000} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.13%_34.63%_90.94%_62.94%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.241 34.5796">
                <path d={svgPaths.p3e8d72b0} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[4.35%_10.44%_90%_82.94%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.8669 32.9587">
                <path d={svgPaths.pd790c00} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[4.5%_88.93%_90.11%_7.54%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6089 31.4318">
                <path d={svgPaths.p1dcf7400} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[4.43%_50.21%_90%_45.16%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.8091 32.4513">
                <path d={svgPaths.p370daf80} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[2.65%_90.89%_90.79%_6.61%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8374 38.2295">
                <path d={svgPaths.p10541300} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.78%_85.76%_95.26%_8.2%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.4658 5.61806">
                <path d={svgPaths.p14c7f900} fill="var(--fill-0, #FEF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.73%_10.59%_95.26%_83.53%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.3188 5.85733">
                <path d={svgPaths.p3dbf1580} fill="var(--fill-0, #FDF79E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.82%_29.64%_95.27%_64.63%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.1598 5.32863">
                <path d={svgPaths.p14d02300} fill="var(--fill-0, #FDF8A1)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[2.08%_34.55%_95.86%_62.99%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5417 12.0229">
                <path d={svgPaths.p4729900} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[2.06%_16.09%_95.86%_81.79%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9687 12.1217">
                <path d={svgPaths.p26fef200} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[22.62%_1.9%_75.66%_95.68%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1879 10.0082">
                <path d={svgPaths.p17d36800} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.99%_28.37%_95.31%_69.84%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4638 4.08343">
                <path d={svgPaths.p42a4300} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[4.11%_9.1%_95.38%_89.28%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2113 2.99523">
                <path d={svgPaths.p1d710180} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[9.69%_9.32%_90.05%_87.31%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.3565 1.47562">
                <path d={svgPaths.p2b00f180} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[8.52%_35.64%_90.78%_63.34%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.63001 4.10176">
                <path d={svgPaths.p10bf6070} fill="var(--fill-0, #FEE642)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[3.7%_5.11%_90.84%_92.11%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9399 31.8393">
                <path d={svgPaths.p2f5a6180} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[95.01%_7.13%_-4.57%_7.17%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 645.318 55.7616">
                <path d={svgPaths.p3919000} fill="var(--fill-0, #F1B828)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[86.97%_2.71%_4.72%_3.39%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 707.066 48.4505">
                <path d={svgPaths.p1e45db00} fill="var(--fill-0, #FBC81E)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[86.97%_2.71%_4.72%_6.26%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 685.439 48.4505">
                <path d={svgPaths.p35651800} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[32.87%_13.6%_65.43%_14.17%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 543.886 9.90165">
                <path d={svgPaths.p35d1900} fill="var(--fill-0, #FFD21F)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[33.96%_36.41%_65.69%_14.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 370.595 2.03955">
                <path d={svgPaths.p38bfad00} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[33.98%_13.98%_65.68%_57.36%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.788 2.00895">
                <path d={svgPaths.pf3af960} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[44.82%_1.21%_12.88%_94.6%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.6094 246.574">
                <path d={svgPaths.p3e198080} fill="var(--fill-0, #F9C417)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[73.45%_2.2%_23.55%_96.4%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5468 17.4643">
                <path d={svgPaths.p2bcdeb00} fill="var(--fill-0, #F1B828)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[32.86%_5.61%_58.31%_12.99%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 612.954 51.4714">
                <path d={svgPaths.p3cdd4700} fill="var(--fill-0, #F1B828)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[73.71%_96.04%_23.7%_2.36%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0959 15.089">
                <path d={svgPaths.p21310f00} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[74.94%_96.06%_23.7%_2.65%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.69213 7.91274">
                <path d={svgPaths.p3f040780} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[36.33%_4.43%_8.84%_4.87%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682.932 319.665">
                <path d={svgPaths.p3f05600} fill="var(--fill-0, #FCCF28)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[36.33%_4.43%_8.85%_4.87%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682.932 319.597">
                <path d={svgPaths.p31acb770} fill="var(--fill-0, #F5B910)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[37.87%_78.67%_47.3%_9.19%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.4587 86.4639">
                <path d={svgPaths.p36b64800} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[52.39%_14.58%_47.1%_15.07%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 529.767 2.99556">
                <path d={svgPaths.pffb7b00} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[53.35%_85.23%_9.08%_12.95%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6979 219.019">
                <path d={svgPaths.pa5c5000} fill="var(--fill-0, #F1B828)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[52.57%_12.51%_12.16%_85.23%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0288 205.602">
                <path d={svgPaths.p1a362200} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[87.38%_12.36%_9.12%_87.26%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90349 20.4044">
                <path d={svgPaths.p35fb7bf0} fill="var(--fill-0, #FEDC34)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[81.09%_83.51%_9.02%_13.14%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.2751 57.6679">
                <path d={svgPaths.p37b3a3d0} fill="var(--fill-0, #D8870D)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[36.11%_27.26%_63.58%_9.76%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 474.264 1.80972">
                <path d={svgPaths.p18874500} fill="var(--fill-0, #FEEB72)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[91.59%_85.06%_7.51%_5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.8554 5.23168">
                <path d={svgPaths.p40f8470} fill="var(--fill-0, #FEEE73)" id="Vector" />
              </svg>
            </div>
            <div className="absolute contents inset-[41.68%_20.19%_14.24%_15.94%]">
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[41.68%_68.53%_39.79%_15.94%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[67.24%_68.26%_14.24%_16.2%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[41.68%_45.02%_39.79%_39.44%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[67.24%_44.75%_14.24%_39.71%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[41.68%_20.45%_39.79%_64.01%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
              <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[67.24%_20.19%_14.24%_64.28%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
                <CanvasBackgroundImage />
                <ParagraphBackgroundImageAndText text="x 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}