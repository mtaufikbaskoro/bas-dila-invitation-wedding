"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type GalleryImage = {
	fileName: string;
	url: string;
};

const initialVisibleCount = 3;
const revealBatchSize = 3;

export function GalleryGrid({ gallery }: { gallery: GalleryImage[] }) {
	const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
	const hasMoreImages = visibleCount < gallery.length;
	const visibleGallery = gallery.slice(0, visibleCount);
	const animatedStartIndex = visibleCount > initialVisibleCount ? visibleCount - revealBatchSize : -1;
	const shouldAnimate = (index: number) => animatedStartIndex >= 0 && index >= animatedStartIndex;

	function showMoreImages() {
		setVisibleCount((currentCount) => Math.min(currentCount + revealBatchSize, gallery.length));
	}

	if (gallery.length === 0) {
		return <p className="text-center text-muted">Belum ada foto di galeri.</p>;
	}

	return (
		<>
			<div id="gallery-grid" className="grid grid-cols-2 items-start gap-5 sm:gap-8">
				{visibleGallery.map(({ fileName, url }, index) => (
					<div
						key={fileName}
						className={`${shouldAnimate(index) ? "animate-gallery-slide" : ""} ${index === 0 || index === 3 ? "col-span-2" : "col-span-1"}`}
					>
						<figure
							className={`${index % 2 ? "rotate-2" : "-rotate-1"} rounded-sm border-8 border-surface-white bg-surface-white shadow-lg shadow-primary/10 transition hover:-translate-y-2 hover:rotate-0`}
						>
							<div className={`relative ${index === 0 ? "aspect-[4/5]" : index === 3 ? "aspect-video" : "aspect-square"}`}>
								<Image
									src={url}
									alt={`Momen pernikahan ${index + 1}`}
									fill
									sizes={index === 0 || index === 3 ? "(max-width: 640px) calc(100vw - 48px), 816px" : "(max-width: 640px) calc((100vw - 53px) / 2), 392px"}
									className="object-cover"
								/>
							</div>
						</figure>
					</div>
				))}
			</div>
			{hasMoreImages && (
				<button
					type="button"
					onClick={showMoreImages}
					aria-controls="gallery-grid"
					aria-expanded={visibleCount > initialVisibleCount}
					className="mx-auto mt-16 flex items-center gap-2 rounded-full border border-outline px-8 py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
				>
					Lebih Banyak <ChevronDown size={16} aria-hidden="true" />
				</button>
			)}
		</>
	);
}