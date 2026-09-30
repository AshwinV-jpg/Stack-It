import clsx from "clsx";
import imgImage31 from "figma:asset/68930fa031209c729e9f39b9968e5babe416515f.png";
import imgImage32 from "figma:asset/ed4acea6f9dfb9033a56299ce8d8df97481e8e0d.png";
import imgImgTile from "figma:asset/d052e328cac4c836e31df842123d89f6f1477483.png";
type Component21X1BrickBackgroundImageProps = {
  additionalClassNames?: string;
};

function Component21X1BrickBackgroundImage({ additionalClassNames = "" }: Component21X1BrickBackgroundImageProps) {
  return (
    <div className={clsx("absolute size-[42px]", additionalClassNames)}>
      <div className="absolute inset-0 shadow-[1.75px_3.5px_7px_0px_rgba(0,0,0,0.38)]" data-name="brick">
        <div className="absolute bg-size-[48px_48px] bg-top-left border-[0.875px] border-[rgba(0,0,0,0.18)] border-solid inset-0 rounded-[1px]" data-name="img (tile)" style={{ backgroundImage: `url('${imgImgTile}')` }} />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-0.875px_-0.875px_0px_0px_rgba(0,0,0,0.08),inset_0.875px_0.875px_0px_0px_rgba(255,255,255,0.12)]" />
      </div>
      <div className="absolute inset-0 mix-blend-overlay" data-name="fill">
        <div className="absolute bg-[#fdc73e] inset-0" data-name="color" />
      </div>
    </div>
  );
}
type Component2ImageBackgroundImageProps = {
  additionalClassNames?: string;
};

function Component2ImageBackgroundImage({ additionalClassNames = "" }: Component2ImageBackgroundImageProps) {
  return (
    <div className={clsx("absolute h-[549px] left-0 w-[1679px]", additionalClassNames)}>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage32} />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="2">
      <div className="absolute h-[993px] left-0 top-0 w-[1679px]" data-name="image 31">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage31} />
      </div>
      <Component2ImageBackgroundImage additionalClassNames="top-0" />
      <Component2ImageBackgroundImage additionalClassNames="top-[545px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[735px] top-[292px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[734px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[779px] top-[292px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[777px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[823px] top-[292px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[820px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[867px] top-[292px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[863px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[906px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[949px] top-[629px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[907px] top-[334px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[950px] top-[377px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[909px] top-[418px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[863px] top-[460px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[819px] top-[502px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[777px] top-[544px]" />
      <Component21X1BrickBackgroundImage additionalClassNames="left-[734px] top-[586px]" />
      <div className="absolute border-4 border-[#fdc73e] border-solid h-[551px] left-[518px] top-[205px] w-[645px]" />
    </div>
  );
}