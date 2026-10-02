import clsx from "clsx";
import imgImage31 from "figma:asset/68930fa031209c729e9f39b9968e5babe416515f.jpg";
import imgImage32 from "figma:asset/ed4acea6f9dfb9033a56299ce8d8df97481e8e0d.png";
type Component62ImageImageProps = {
  additionalClassNames?: string;
};

function Component62ImageImage({ additionalClassNames = "" }: Component62ImageImageProps) {
  return (
    <div className={clsx("absolute h-[549px] left-0 w-[1679px]", additionalClassNames)}>
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage32} />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="62">
      <div className="absolute h-[993px] left-0 top-0 w-[1679px]" data-name="image 31">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage31} />
      </div>
      <Component62ImageImage additionalClassNames="top-[-456px]" />
      <Component62ImageImage additionalClassNames="top-[905px]" />
    </div>
  );
}