import imgBaseImage2162 from "figma:asset/1241b8da08fbb12d5096b3af579b1986259b0ff8.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[130px] left-[126px] top-[26px] w-[90px]" data-name="BASE IMAGE 2-16 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[359.04%] left-[-396.14%] max-w-none top-[-206.91%] w-[926.64%]" src={imgBaseImage2162} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[96px] left-1/2 top-[65px] w-[342px]" data-name="Button Design">
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
    </div>
  );
}