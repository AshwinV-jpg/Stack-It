export default function ButtonDesign() {
  return (
    <div className="relative size-full" data-name="Button Design">
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
            <p className="font-['Holtwood_One_SC:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[26px] text-white tracking-[-0.3545px] uppercase">START</p>
          </div>
        </div>
      </div>
    </div>
  );
}