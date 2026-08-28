import Image from "next/image";

type FloralAsset =
  | "bouquet"
  | "closed-pink-sprigs"
  | "pink-sprigs"
  | "orange-sprig"
  | "upper-foliage"
  | "middle-flowers"
  | "lower-foliage"
  | "green-white-leaves"
  | "brown-white-leaves"
  | "light-pink-flower"
  | "rose-flower"
  | "yellow-flower";

const assetPaths: Record<FloralAsset, string> = {
  bouquet: "/assets/flowers/bouquet.png",
    "closed-pink-sprigs": "/assets/flowers/closed-pink-sprigs.png",
    "pink-sprigs": "/assets/flowers/pink-sprigs.png",
    "orange-sprig": "/assets/flowers/orange-sprig.png",
    "upper-foliage": "/assets/flowers/upper-foliage.png",
    "middle-flowers": "/assets/flowers/middle-flowers.png",
    "lower-foliage": "/assets/flowers/lower-foliage.png",
    "green-white-leaves": "/assets/flowers/green-white-leaves.png",
    "brown-white-leaves": "/assets/flowers/brown-white-leaves.png",
    "light-pink-flower": "/assets/flowers/light-pink-flower.png",
    "rose-flower": "/assets/flowers/rose-flower.png",
    "yellow-flower": "/assets/flowers/yellow-flower.png",
};

export function FloralDecoration({
  asset,
  className = "",
  priority = false,
}: {
  asset: FloralAsset;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-20 select-none ${className}`}>
      <Image
        src={assetPaths[asset]}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 640px) 32vw, 280px"
        className="object-contain"
      />
    </div>
  );
}