"use client";

import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

type GalleryImage = {
	fileName: string;
	url: string;
};

const initialVisibleCount = 3;
const revealBatchSize = 3;

export function GalleryGrid({ gallery }: { gallery: GalleryImage[] }) {
	const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
	const hasMoreImages = visibleCount < gallery.length;
	const visibleGallery = gallery.slice(0, visibleCount);
	const animatedStartIndex = visibleCount > initialVisibleCount ? visibleCount - revealBatchSize : -1;
	const shouldAnimate = (index: number) => animatedStartIndex >= 0 && index >= animatedStartIndex;

	useEffect(() => {
		if (!selectedImage) {
			return;
		}

		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setSelectedImage(null);
			}
		}

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", closeOnEscape);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [selectedImage]);

	function showMoreImages() {
		setVisibleCount((currentCount) => Math.min(currentCount + revealBatchSize, gallery.length));
	}

	if (gallery.length === 0) {
		return <p className="text-center text-muted">{wedding.galleryPage.emptyText}</p>;
	}

	return (
		<>
			<div id="gallery-grid" className="grid grid-cols-2 items-start gap-5 sm:gap-8">
				{visibleGallery.map(({ fileName, url }, index) => (
					<div
						key={fileName}
						className={`${shouldAnimate(index) ? "animate-gallery-slide" : ""} ${index === 0 || index === 3 ? "col-span-2" : "col-span-1"}`}
					>
						<button
							type="button"
							onClick={() => setSelectedImage({ fileName, url })}
							aria-label={`${wedding.galleryPage.enlargeLabel} ${wedding.galleryPage.imageAlt.toLowerCase()} ${index + 1}`}
							className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
						>
							<figure
								className={`${index % 2 ? "rotate-2" : "-rotate-1"} rounded-sm border-8 border-surface-white bg-surface-white shadow-lg shadow-primary/10 transition duration-500 hover:-translate-y-3 hover:rotate-0 hover:scale-[1.025] hover:shadow-xl`}
							>
								<div className={`relative ${index === 0 ? "aspect-[4/5]" : index === 3 ? "aspect-video" : "aspect-square"}`}>
									<Image
										src={url}
										alt={`${wedding.galleryPage.imageAlt} ${index + 1}`}
										fill
										sizes={index === 0 || index === 3 ? "(max-width: 640px) calc(100vw - 48px), 816px" : "(max-width: 640px) calc((100vw - 53px) / 2), 392px"}
										className="object-cover"
									/>
								</div>
							</figure>
						</button>
					</div>
				))}
			</div>
			{hasMoreImages && (
				<button
					type="button"
					onClick={showMoreImages}
					aria-controls="gallery-grid"
					aria-expanded={visibleCount > initialVisibleCount}
					className="motion-press mx-auto mt-16 flex items-center gap-2 rounded-full border border-outline px-8 py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
				>
					{wedding.galleryPage.moreLabel} <ChevronDown size={16} aria-hidden="true" />
				</button>
			)}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 sm:p-8"
					role="dialog"
					aria-modal="true"
					aria-label={wedding.galleryPage.dialogLabel}
					onClick={() => setSelectedImage(null)}
				>
					<button
						type="button"
						className="absolute right-4 top-4 z-10 rounded-full bg-surface-white/90 p-3 text-foreground shadow-lg transition hover:bg-surface-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-8 sm:top-8"
						onClick={() => setSelectedImage(null)}
						aria-label={wedding.galleryPage.closeLabel}
					>
						<X size={22} aria-hidden="true" />
					</button>
					<div className="animate-modal-in relative h-[85vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
						<Image
							src={selectedImage.url}
							alt={`${wedding.galleryPage.imageAlt} dalam ukuran penuh`}
							fill
											sizes="100vw"
							className="object-contain"
						/>
					</div>
				</div>
			)}
		</>
	);
}