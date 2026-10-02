import clsx from "clsx";
import svgPaths from "./svg-7l1cn0q27s";
import imgT0 from "figma:asset/f1e2b66a91a89a92329c7652f6d1e0e83af85c0f.jpg";
import imgCanvas from "figma:asset/06f6beaf4824ad3bfbb53a6cd73973d03e08b130.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
import imgImage36 from "figma:asset/f33a91112c1b7e75188f7c7c0c34e70a06d9d1fc.png";
import imgCanvas1 from "figma:asset/9cf0ac7b5135cc6eb8513210a570728ccc4a9384.png";
type BackgroundImageProps = {
  additionalClassNames?: string;
  additionalClassNames1?: string;
};

function BackgroundImage({ children, additionalClassNames = "", additionalClassNames1 = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties} className={clsx("absolute flex h-[74.495px] items-center justify-center w-[66.324px]", additionalClassNames)}>
      <div className={clsx("flex-none", additionalClassNames)}>
        <div className="h-[63.266px] relative w-[51.712px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.7116 63.2664">
            {children}
          </svg>
        </div>
      </div>
    </div>
  );
}
type Group1000001832BackgroundImageProps = {
  additionalClassNames?: string;
};

function Group1000001832BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Group1000001832BackgroundImageProps>) {
  return (
    <div className={clsx("h-[65px] w-[61.165px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61.1655 65">
        {children}
      </svg>
    </div>
  );
}

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
type Group10000018251X1BrickBackgroundImageProps = {
  additionalClassNames?: string;
};

function Group10000018251X1BrickBackgroundImage({ additionalClassNames = "" }: Group10000018251X1BrickBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[48px]", additionalClassNames)}>
      <div className="absolute inset-0 shadow-[2px_4px_8px_0px_rgba(0,0,0,0.38)]" data-name="brick">
        <div className="absolute bg-size-[48px_48px] bg-top-left border border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
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
        <div className="-translate-x-1/2 absolute bg-[rgba(0,0,0,0.2)] border-2 border-solid border-white h-[896px] left-[calc(50%-369.5px)] overflow-clip rounded-[16px] top-[49px] w-[850px]" data-name="Container">
          <div className="-translate-x-1/2 absolute bg-[#ef3f54] h-[80px] left-[calc(50%-0.09px)] rounded-[16px] shadow-[0px_8px_0px_0px_#900] top-[765px] w-[341.828px]" data-name="Button">
            <div className="-translate-x-1/2 absolute content-stretch flex gap-[17px] items-start left-[calc(50%+0.09px)] top-[24px]">
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
        <div className="-translate-x-1/2 absolute h-[577.746px] left-[calc(50%-369.91px)] overflow-clip top-[208px] w-[975.176px]" data-name="Canvas">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[201.91%] left-[-56.98%] max-w-none top-[-62.1%] w-[214.34%]" src={imgCanvas} />
          </div>
          <div className="absolute h-[307.272px] left-[238.27px] top-[115.92px] w-[498.628px]">
            <div className="absolute inset-[-0.33%_-0.11%_-0.37%_-0.35%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 500.932 309.437">
                <path d={svgPaths.p1c1ac000} id="Vector 211" stroke="var(--stroke-0, white)" strokeWidth="1.83995" />
              </svg>
            </div>
          </div>
          <div className="absolute flex h-[473.924px] items-center justify-center left-[132.96px] top-[52.31px] w-[708.805px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-[2.48deg]">
              <div className="h-[444.462px] relative w-[690.212px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 690.212 444.462">
                  <g id="Group 1000001826">
                    <path d={svgPaths.p315d5a00} fill="var(--fill-0, #F1F5F9)" id="Vector 210" stroke="var(--stroke-0, black)" />
                    <g id="Vector 211">
                      <path d={svgPaths.p3ba4c260} fill="var(--fill-0, #F1F5F9)" />
                      <path d={svgPaths.pfb85100} stroke="var(--stroke-0, #B5B5B5)" strokeWidth="1.83995" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute h-[290.213px] left-[152.05px] top-[245.26px] w-[672.315px]">
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
        <div className="-translate-x-1/2 absolute h-[96px] left-[calc(50%-369.5px)] top-[89px] w-[384px]" data-name>
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
        <div className="absolute contents left-[949px] top-[49px]">
          <div className="absolute bg-[#128a74] h-[13px] left-[949px] rounded-[20px] top-[81px] w-[138px]" />
          <div className="absolute content-stretch flex items-center justify-between left-[994px] top-[49px] w-[872px]">
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
        <div className="absolute contents left-[1084px] top-[174px]">
          <div className="absolute contents left-[1104px] top-[174px]">
            <div className="absolute h-[333px] left-[1154px] top-[221px] w-[286px]" data-name="image 36">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[153.6%] left-[-13.84%] max-w-none top-[-7%] w-[119.07%]" src={imgImage36} />
              </div>
            </div>
            <div className="absolute bg-[rgba(61,33,144,0.5)] content-stretch flex items-center justify-center left-[1104px] p-[20px] rounded-[8px] top-[174px]">
              <div aria-hidden="true" className="absolute border-2 border-[#5851ee] border-solid inset-0 pointer-events-none rounded-[8px]" />
              <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[72px] not-italic relative shrink-0 text-[64px] text-white tracking-[-0.3545px] uppercase">Let’s G0</p>
            </div>
          </div>
          <Group1000001832BackgroundImage additionalClassNames="absolute left-[1448px] top-[289px]">
            <path d={svgPaths.p2b22e980} fill="var(--fill-0, white)" id="Vector 215" />
          </Group1000001832BackgroundImage>
          <div className="absolute flex h-[65px] items-center justify-center left-[1084px] top-[295px] w-[61.165px]">
            <div className="-scale-y-100 flex-none rotate-180">
              <Group1000001832BackgroundImage additionalClassNames="relative">
                <path d={svgPaths.p2b22e980} fill="var(--fill-0, white)" id="Vector 217" />
              </Group1000001832BackgroundImage>
            </div>
          </div>
          <BackgroundImage additionalClassNames="left-[1439.45px] top-[338px]" additionalClassNames1="rotate-15">
            <path d={svgPaths.p14fa3280} fill="var(--fill-0, white)" id="Vector 216" />
          </BackgroundImage>
          <BackgroundImage additionalClassNames="left-[1087.39px] top-[344px]" additionalClassNames1="-scale-y-100 rotate-165">
            <path d={svgPaths.p14fa3280} fill="var(--fill-0, white)" id="Vector 218" />
          </BackgroundImage>
        </div>
      </div>
      <div className="absolute contents left-[864px] top-[410px]">
        <div className="absolute h-[618px] left-[864px] overflow-clip top-[410px] w-[824px]" data-name="image 34 [Vectorized]">
          <div className="absolute inset-[0.31%_3.52%_1.35%_7.61%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 732.298 607.733">
              <path d={svgPaths.p3c3bd300} fill="var(--fill-0, #FEE642)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute inset-[0.31%_3.52%_67.87%_7.62%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 732.248 196.639">
              <path d={svgPaths.p1367d100} fill="var(--fill-0, #FCCF28)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="4" />
            </svg>
          </div>
          <div className="absolute inset-[22.28%_5.68%_67.95%_7.94%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 711.755 60.4286">
              <path d={svgPaths.p22dafc70} fill="var(--fill-0, #FAB818)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[22.33%_74.47%_67.95%_7.94%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 144.946 60.1269">
              <path d={svgPaths.p2be7d1c0} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[22.58%_12.13%_72.3%_87.24%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.19273 31.6407">
              <path d={svgPaths.p3d372100} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[0.31%_58.11%_90.57%_29.46%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 102.439 56.3373">
              <path d={svgPaths.p3e799580} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[0.31%_60.11%_95.78%_29.46%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.978 24.1662">
              <path d={svgPaths.p39e6480} fill="var(--fill-0, #FCCF28)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[1.87%_68.53%_96.21%_29.46%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5724 11.8794">
              <path d={svgPaths.p246c5700} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.04%_62.44%_90.57%_29.49%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.4795 39.4574">
              <path d={svgPaths.p2646bc00} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.04%_68.4%_91.24%_29.49%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3464 35.3153">
              <path d={svgPaths.p29525800} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[8.15%_69.16%_91.24%_29.94%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.45091 3.71956">
              <path d={svgPaths.p317b0900} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[9.02%_62.26%_90.58%_34.77%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4726 2.50489">
              <path d={svgPaths.p1789ff00} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[12.28%_34.49%_78.26%_7.62%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 476.989 58.4714">
              <path d={svgPaths.p2b71f1f0} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[12.28%_89.89%_78.26%_7.62%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5048 58.4714">
              <path d={svgPaths.pb604800} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[12.28%_91.1%_78.26%_7.62%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5436 58.4714">
              <path d={svgPaths.p2d0ff100} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.23%_5.75%_77.58%_7.92%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 711.384 7.33104">
              <path d={svgPaths.p1553cf80} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.5%_5.75%_77.6%_10.81%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 687.576 5.56142">
              <path d={svgPaths.p96c1280} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.59%_56.75%_77.58%_7.92%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 291.102 5.12183">
              <path d={svgPaths.p3451e00} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.67%_84.78%_77.58%_7.92%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.1528 4.65119">
              <path d={svgPaths.p21a49fc0} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.6%_85.56%_77.86%_8.61%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.9619 3.34341">
              <path d={svgPaths.p10e2ee80} fill="var(--fill-0, #FEF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[0.34%_36.18%_90.46%_46.66%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 141.388 56.8329">
              <path d={svgPaths.p3e7680} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[0.34%_42.91%_95.53%_46.66%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85.9157 25.5201">
              <path d={svgPaths.p3b0ffd00} fill="var(--fill-0, #FCCF28)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.6%_46.6%_95.53%_48.03%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.1798 5.41005">
              <path d={svgPaths.p1e4b0000} fill="var(--fill-0, #FEF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[1.88%_51.35%_96.1%_46.66%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3453 12.4887">
              <path d={svgPaths.p277c4100} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[5.03%_41.62%_91.81%_57.09%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6623 19.5349">
              <path d={svgPaths.p110b2200} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[9.03%_45%_90.57%_51.65%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5812 2.44035">
              <path d={svgPaths.p26e88f80} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[2.58%_23.92%_90.45%_64.98%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.4282 43.0639">
              <path d={svgPaths.p3e4eec00} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[4.1%_32.42%_90.81%_64.98%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3464 31.4526">
              <path d={svgPaths.pe321a00} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[8.97%_27.72%_90.58%_66.4%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.4113 2.76962">
              <path d={svgPaths.p1dcd5100} fill="var(--fill-0, #FEF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[1.84%_70.42%_90.59%_15.39%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116.899 46.7871">
              <path d={svgPaths.p158974f0} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[4.71%_75.57%_91.79%_22.81%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3896 21.5995">
              <path d={svgPaths.p1bce7580} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[8.96%_79.32%_90.59%_15.39%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.5701 2.78507">
              <path d={svgPaths.p16cae800} fill="var(--fill-0, #FEF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[12.38%_4.74%_86.72%_54.09%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 339.197 5.56468">
              <path d={svgPaths.p1b7e2b80} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[12.46%_3.52%_67.87%_19.26%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 636.356 121.56">
              <path d={svgPaths.p21e6470} fill="var(--fill-0, #F1B828)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[2.88%_16.86%_90.7%_80.81%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2133 39.6666">
              <path d={svgPaths.p3fda2000} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[2.95%_34.08%_91.46%_63.71%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.241 34.5796">
              <path d={svgPaths.p3e8d72b0} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[4.1%_11.96%_90.56%_81.98%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.8669 32.9587">
              <path d={svgPaths.pd790c00} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[4.25%_83.69%_90.67%_13.08%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6089 31.4318">
              <path d={svgPaths.p1dcf7400} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[4.18%_48.31%_90.57%_47.46%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.8091 32.4513">
              <path d={svgPaths.p370daf80} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[2.5%_85.49%_91.32%_12.23%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8374 38.2295">
              <path d={svgPaths.p10541300} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.57%_80.8%_95.53%_13.69%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.4658 5.61806">
              <path d={svgPaths.p14c7f900} fill="var(--fill-0, #FEF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.52%_12.1%_95.53%_82.52%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.3188 5.85733">
              <path d={svgPaths.p3dbf1580} fill="var(--fill-0, #FDF79E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.6%_29.51%_95.54%_65.25%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.1598 5.32863">
              <path d={svgPaths.p14d02300} fill="var(--fill-0, #FDF8A1)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[1.96%_34%_96.09%_63.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5417 12.0229">
              <path d={svgPaths.p4729900} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[1.95%_17.13%_96.09%_80.93%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9687 12.1217">
              <path d={svgPaths.p26fef200} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[21.34%_4.16%_77.04%_93.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1879 10.0082">
              <path d={svgPaths.p17d36800} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.77%_28.36%_95.57%_70.01%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4638 4.08343">
              <path d={svgPaths.p42a4300} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.87%_10.74%_95.64%_87.78%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2113 2.99523">
              <path d={svgPaths.p1d710180} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[9.14%_10.94%_90.62%_85.98%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.3565 1.47562">
              <path d={svgPaths.p2b00f180} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[8.04%_35%_91.3%_64.07%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.63001 4.10176">
              <path d={svgPaths.p10bf6070} fill="var(--fill-0, #FEE642)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[3.49%_7.1%_91.36%_90.36%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9399 31.8393">
              <path d={svgPaths.p2f5a6180} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[89.63%_8.94%_1.35%_12.74%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 645.318 55.7616">
              <path d={svgPaths.p3919000} fill="var(--fill-0, #F1B828)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[82.04%_4.91%_10.12%_9.28%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 707.066 48.4505">
              <path d={svgPaths.p1e45db00} fill="var(--fill-0, #FBC81E)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[82.04%_4.91%_10.12%_11.91%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 685.439 48.4505">
              <path d={svgPaths.p35651800} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[31.01%_14.85%_67.39%_19.14%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 543.886 9.90165">
              <path d={svgPaths.p35d1900} fill="var(--fill-0, #FFD21F)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[32.04%_35.7%_67.63%_19.32%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 370.595 2.03955">
              <path d={svgPaths.p38bfad00} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[32.05%_15.21%_67.62%_58.61%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 215.788 2.00895">
              <path d={svgPaths.pf3af960} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[42.28%_3.53%_17.82%_92.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.6094 246.574">
              <path d={svgPaths.p3e198080} fill="var(--fill-0, #F9C417)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[69.29%_4.44%_27.88%_94.28%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5468 17.4643">
              <path d={svgPaths.p2bcdeb00} fill="var(--fill-0, #F1B828)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[31%_7.55%_60.67%_18.06%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 612.954 51.4714">
              <path d={svgPaths.p3cdd4700} fill="var(--fill-0, #F1B828)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[69.54%_90.19%_28.02%_8.34%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0959 15.089">
              <path d={svgPaths.p21310f00} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[70.7%_90.21%_28.02%_8.61%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.69213 7.91274">
              <path d={svgPaths.p3f040780} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[34.27%_6.48%_14%_10.64%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682.932 319.665">
              <path d={svgPaths.p3f05600} fill="var(--fill-0, #FCCF28)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[34.27%_6.48%_14.01%_10.64%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 682.932 319.597">
              <path d={svgPaths.p31acb770} fill="var(--fill-0, #F5B910)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[35.72%_74.31%_50.29%_14.59%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.4587 86.4639">
              <path d={svgPaths.p36b64800} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[49.42%_15.75%_50.09%_19.96%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 529.767 2.99556">
              <path d={svgPaths.pffb7b00} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[50.33%_80.31%_14.23%_18.03%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6979 219.019">
              <path d={svgPaths.pa5c5000} fill="var(--fill-0, #F1B828)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[49.59%_13.86%_17.14%_84.08%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0288 205.602">
              <path d={svgPaths.p1a362200} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[82.43%_13.72%_14.27%_85.93%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90349 20.4044">
              <path d={svgPaths.p35fb7bf0} fill="var(--fill-0, #FEDC34)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[76.5%_78.74%_14.17%_18.19%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.2751 57.6679">
              <path d={svgPaths.p37b3a3d0} fill="var(--fill-0, #D8870D)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[34.07%_27.34%_65.64%_15.11%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 474.264 1.80972">
              <path d={svgPaths.p18874500} fill="var(--fill-0, #FEEB72)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[86.4%_80.15%_12.75%_10.76%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74.8554 5.23168">
              <path d={svgPaths.p40f8470} fill="var(--fill-0, #FEEE73)" id="Vector" />
            </svg>
          </div>
          <div className="absolute contents inset-[39.32%_20.87%_19.09%_20.75%]">
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[39.32%_65.05%_43.2%_20.75%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[63.43%_64.81%_19.09%_21%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[39.32%_43.57%_43.2%_42.23%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[63.43%_43.33%_19.09%_42.48%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[39.32%_21.12%_43.2%_64.68%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
            <div className="absolute content-stretch flex flex-col gap-[4.68px] inset-[63.43%_20.87%_19.09%_64.93%] items-center justify-center pb-[4.68px] rounded-[18.72px] shadow-[0px_1.17px_3.51px_0px_rgba(0,0,0,0.1),0px_1.17px_2.34px_0px_rgba(0,0,0,0.1)]" data-name="Button">
              <CanvasBackgroundImage />
              <ParagraphBackgroundImageAndText text="x 3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}