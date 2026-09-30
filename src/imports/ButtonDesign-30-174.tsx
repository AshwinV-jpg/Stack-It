import svgPaths from "./svg-13hsaamtz3";
type ButtonDesignProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3" | "Variant4";
};

function ButtonDesign({ className, property1 = "Default" }: ButtonDesignProps) {
  const isVariant2 = property1 === "Variant2";
  const isVariant2OrVariant3OrVariant4 = ["Variant2", "Variant3", "Variant4"].includes(property1);
  const isVariant3 = property1 === "Variant3";
  const isVariant4 = property1 === "Variant4";
  return (
    <div className={className || `-translate-x-1/2 h-[96px] relative w-[342px] ${["Variant3", "Variant4"].includes(property1) ? "shadow-[0px_4px_40px_0px_#aa0418]" : isVariant2 ? "shadow-[0px_4px_20px_0px_rgba(170,4,24,0.3)]" : ""}`}>
      <div className="absolute bg-[#aa0418] h-[72px] left-0 rounded-[20px] top-[24px] w-[342px]" />
      <div className={`-translate-x-1/2 absolute bg-[#ef3f54] left-1/2 overflow-clip rounded-[20px] top-0 w-[342px] ${isVariant4 ? "h-[87px]" : isVariant3 ? "h-[86px]" : isVariant2 ? "h-[83px]" : "h-[80px]"}`}>
        <div className={`absolute left-0 overflow-clip top-0 w-[342px] ${isVariant4 ? "h-[87px]" : isVariant3 ? "h-[86px]" : "h-[80px]"}`}>
          <div className="-translate-x-1/2 absolute content-stretch flex gap-[24px] items-center left-[calc(50%+0.09px)] top-[24px]">
            <div className="relative shrink-0 size-[32px]" data-name="Icon">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <g id="Icon">
                  <path d="M8 4L26.6667 16L8 28V4Z" fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
                </g>
              </svg>
            </div>
            <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[26px] text-white tracking-[-0.3545px] uppercase">START</p>
          </div>
          {isVariant2OrVariant3OrVariant4 && (
            <>
              <div className={`absolute top-0 ${isVariant4 ? "h-[87px] left-[182px] w-[133px]" : isVariant3 ? "h-[85.5px] left-[134px] w-[133.5px]" : "h-[80px] left-[27px] w-[126.5px]"}`}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isVariant4 ? "0 0 133 87" : isVariant3 ? "0 0 133.5 85.5" : "0 0 126.5 80"}>
                  <path d={isVariant4 ? "M72.5 87L0 0H28L133 87H72.5Z" : isVariant3 ? svgPaths.p6a057c0 : svgPaths.pc675e80} fill={isVariant4 ? "url(#paint0_linear_30_269)" : isVariant3 ? "url(#paint0_linear_30_258)" : "url(#paint0_linear_30_252)"} fillOpacity="0.2" id="Vector 213" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id={isVariant4 ? "paint0_linear_30_269" : isVariant3 ? "paint0_linear_30_258" : "paint0_linear_30_252"} x1="28.5" x2="76" y1="29" y2="83">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className={`absolute top-0 ${isVariant4 ? "h-[86.5px] left-[220px] w-[117.5px]" : isVariant3 ? "h-[86.5px] left-[172px] w-[132.5px]" : "h-[80px] left-[65px] w-[117.5px]"}`}>
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isVariant4 ? "0 0 117.5 86.5" : isVariant3 ? "0 0 132.5 86.5" : "0 0 117.5 80"}>
                  <path d={isVariant4 ? svgPaths.p27cee4c0 : isVariant3 ? svgPaths.p354e3700 : svgPaths.p2d2bb280} fill={isVariant4 ? "url(#paint0_linear_30_256)" : isVariant3 ? "url(#paint0_linear_30_254)" : "url(#paint0_linear_30_250)"} fillOpacity="0.2" id="Vector 214" />
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id={isVariant4 ? "paint0_linear_30_256" : isVariant3 ? "paint0_linear_30_254" : "paint0_linear_30_250"} x1="28.5" x2="76" y1="29" y2="83">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ButtonDesign1() {
  return <ButtonDesign className="relative shadow-[0px_4px_40px_0px_#aa0418] size-full" property1="Variant4" />;
}