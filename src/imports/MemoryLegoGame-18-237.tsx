import clsx from "clsx";
import svgPaths from "./svg-xv2ono8by8";
import imgT0 from "figma:asset/121d8fb231321da8f6e31f015d663924cf5b7e6b.png";
import imgT1 from "figma:asset/21e85c7d107ce3b925cdc275386315c11b6958e2.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
import imgCanvas from "figma:asset/06f6beaf4824ad3bfbb53a6cd73973d03e08b130.png";
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
    <BackgroundImage additionalClassNames={clsx("absolute left-[133px] size-[48px]", additionalClassNames)}>
      <div className="absolute bg-[#ef3f54] inset-0" data-name="color" />
    </BackgroundImage>
  );
}
type Helper1X1BrickBackgroundImage1Props = {
  additionalClassNames?: string;
};

function Helper1X1BrickBackgroundImage1({ additionalClassNames = "" }: Helper1X1BrickBackgroundImage1Props) {
  return (
    <BackgroundImage additionalClassNames={clsx("absolute left-[37px] size-[48px]", additionalClassNames)}>
      <div className="absolute bg-[#fdc73e] inset-0" data-name="color" />
    </BackgroundImage>
  );
}
type Helper1X1BrickBackgroundImageProps = {
  additionalClassNames?: string;
};

function Helper1X1BrickBackgroundImage({ additionalClassNames = "" }: Helper1X1BrickBackgroundImageProps) {
  return (
    <BackgroundImage additionalClassNames={clsx("absolute size-[48px]", additionalClassNames)}>
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
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgT0} />
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgT1} />
        </div>
        <PerspectiveGridBackgroundImage additionalClassNames="left-[-397px] top-[-55px]" />
        <PerspectiveGridBackgroundImage additionalClassNames="left-[1301px] top-[65px]" />
        <Helper1X1BrickBackgroundImage additionalClassNames="left-[1494px] top-[402px]" />
        <Helper1X1BrickBackgroundImage additionalClassNames="left-[1590px] top-[595px]" />
        <Helper1X1BrickBackgroundImage additionalClassNames="left-[1494px] top-[354px]" />
        <Helper1X1BrickBackgroundImage additionalClassNames="left-[1590px] top-[547px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="top-[330px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="top-[379px]" />
        <Helper1X1BrickBackgroundImage1 additionalClassNames="top-[428px]" />
        <div className="-translate-x-1/2 absolute bg-[rgba(248,250,252,0.2)] border-2 border-solid border-white h-[634px] left-[calc(50%+0.5px)] overflow-clip rounded-[16px] top-[186px] w-[1136px]" data-name="Container">
          <div className="absolute content-stretch flex flex-col h-[110px] items-start left-[18px] top-[17px] w-[134px]" data-name="Container">
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
        </div>
        <div className="-translate-x-1/2 absolute h-[96px] left-[calc(50%+0.5px)] top-[788px] w-[342px]" data-name="Button Design">
          <div className="absolute bg-[#aa0418] h-[72px] left-0 rounded-[20px] top-[24px] w-[342px]" />
          <div className="-translate-x-1/2 absolute bg-[#ef3f54] h-[80px] left-1/2 overflow-clip rounded-[20px] top-0 w-[342px]">
            <div className="absolute h-[80px] left-0 overflow-clip top-0 w-[342px]">
              <div className="-translate-x-1/2 absolute content-stretch flex gap-[24px] items-center left-[calc(50%+0.5px)] top-[24px]">
                <div className="relative shrink-0 size-[32px]" data-name="Icon">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="Icon">
                      <path d="M8 4L26.6667 16L8 28V4Z" fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Inter:Black',sans-serif] font-black leading-[32px] not-italic relative shrink-0 text-[24px] text-center text-white tracking-[0.0703px]">I’M READYY</p>
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[436.973px] left-[calc(50%-18.72px)] overflow-clip top-[306px] w-[737.566px]" data-name="Canvas">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[201.91%] left-[-56.98%] max-w-none top-[-62.1%] w-[214.34%]" src={imgCanvas} />
          </div>
          <div className="absolute h-[232.403px] left-[180.22px] top-[87.67px] w-[377.133px]">
            <div className="absolute inset-[-0.33%_-0.11%_-0.37%_-0.35%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 378.876 234.04">
                <path d={svgPaths.p2894cfd8} id="Vector 211" stroke="var(--stroke-0, white)" strokeWidth="1.39163" />
              </svg>
            </div>
          </div>
          <div className="absolute flex h-[358.449px] items-center justify-center left-[100.56px] top-[39.56px] w-[536.099px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
            <div className="flex-none rotate-[2.48deg]">
              <div className="h-[336.165px] relative w-[522.036px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 522.036 336.165">
                  <g id="Group 1000001826">
                    <path d={svgPaths.p2a72b800} fill="var(--fill-0, #F1F5F9)" id="Vector 210" />
                    <g id="Vector 211">
                      <path d={svgPaths.p1d525040} fill="var(--fill-0, #F1F5F9)" />
                      <path d={svgPaths.p159be740} stroke="var(--stroke-0, #B5B5B5)" strokeWidth="1.39163" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute h-[219.5px] left-[115px] top-[185.5px] w-[508.5px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 508.5 219.5">
              <path d={svgPaths.p2c7ef300} fill="var(--fill-0, #D9D9D9)" id="Vector 212" />
            </svg>
          </div>
        </div>
      </div>
      <Helper1X1BrickBackgroundImage2 additionalClassNames="top-[138px]" />
      <Helper1X1BrickBackgroundImage2 additionalClassNames="top-[187px]" />
      <div className="-translate-x-1/2 absolute h-[96px] left-[calc(50%+0.5px)] top-[140px] w-[384px]" data-name>
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
        <div className="-translate-y-1/2 absolute bg-[rgba(59,21,132,0.7)] content-stretch flex h-[36px] items-center justify-center left-[63px] top-1/2 w-[258px]" data-name="Text">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[-0.3545px] uppercase">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[36px]">MEMORIZE</span>
            <span className="leading-[36px]">{`: `}</span>
            <span className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px]">4s</span>
          </p>
        </div>
      </div>
    </div>
  );
}