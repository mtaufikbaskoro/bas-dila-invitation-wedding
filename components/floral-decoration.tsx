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
  | "yellow-flower"
  | "corner-floral"
  | "branch-spray"
  | "botanical-divider"
  | "arch-ornament"
  | "celebration-sparkle";

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
    "corner-floral": "/assets/decorations/corner-floral.svg",
    "branch-spray": "/assets/decorations/branch-spray.svg",
    "botanical-divider": "/assets/decorations/botanical-divider.svg",
    "arch-ornament": "/assets/decorations/arch-ornament.svg",
    "celebration-sparkle": "/assets/decorations/celebration-sparkle.svg",
};

export function FloralDecoration({
  asset,
  className = "",
  priority = false,
  loading = "lazy",
  layer = "foreground",
  motion = true,
}: {
  asset: FloralAsset;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  layer?: "background" | "foreground";
  motion?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${layer === "background" ? "z-0" : "z-20"} ${motion ? "motion-sway" : ""} select-none ${className}`}>
      <Image
        src={assetPaths[asset]}
        alt=""
        fill
        priority={priority}
        loading={priority ? "eager" : loading}
        sizes="(max-width: 640px) 32vw, 280px"
        className="object-contain"
      />
    </div>
  );
}