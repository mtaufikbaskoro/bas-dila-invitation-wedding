"use client";

import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { wedding } from "@/lib/wedding";

type GalleryImage = {
	fileName: string;
	url: string;
};

const initialVisibleCount = 3;
const revealBatchSize = 3;

export function GalleryGrid({ gallery }: { gallery: GalleryImage[] }) {
	const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [zoom, setZoom] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [previewLoadFailed, setPreviewLoadFailed] = useState(false);
	const [previewLoading, setPreviewLoading] = useState(false);
	const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const pointers = useRef(new Map<number, { x: number; y: number }>());
	const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
	const panStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
	const swipeStart = useRef<{ x: number; y: number } | null>(null);
	const hasMoreImages = visibleCount < gallery.length;
	const visibleGallery = gallery.slice(0, visibleCount);
	const animatedStartIndex = visibleCount > initialVisibleCount ? visibleCount - revealBatchSize : -1;
	const shouldAnimate = (index: number) => animatedStartIndex >= 0 && index >= animatedStartIndex;
	const selectedImage = selectedIndex === null ? null : gallery[selectedIndex];
	const minimumZoom = 1;
	const maximumZoom = 4;

	function changeImage(index: number) {
		setSelectedIndex(index);
		setZoom(1);
		setPan({ x: 0, y: 0 });
		setPreviewLoadFailed(false);
		setPreviewLoading(true);
	}

	function changeZoom(amount: number) {
		setZoom((current) => {
			const next = Math.min(maximumZoom, Math.max(minimumZoom, Number((current + amount).toFixed(2))));
			if (next === 1) setPan({ x: 0, y: 0 });
			return next;
		});
	}

	function resetZoom() {
		setZoom(1);
		setPan({ x: 0, y: 0 });
	}

	function distanceBetweenPointers() {
		const points = [...pointers.current.values()];
		if (points.length < 2) return 0;
		return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
	}

	function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
		event.currentTarget.setPointerCapture(event.pointerId);
		pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
		if (pointers.current.size === 1) swipeStart.current = { x: event.clientX, y: event.clientY };
		if (pointers.current.size === 2) {
			pinchStart.current = { distance: distanceBetweenPointers(), zoom };
			panStart.current = null;
		} else if (zoom > 1) {
			panStart.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
		}
	}

	function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
		if (!pointers.current.has(event.pointerId)) return;
		pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
		if (pointers.current.size >= 2 && pinchStart.current) {
			const distance = distanceBetweenPointers();
			const nextZoom = Math.min(maximumZoom, Math.max(minimumZoom, pinchStart.current.zoom * (distance / pinchStart.current.distance)));
			setZoom(Number(nextZoom.toFixed(2)));
			if (nextZoom === 1) setPan({ x: 0, y: 0 });
		} else if (panStart.current && zoom > 1) {
			setPan({ x: panStart.current.panX + event.clientX - panStart.current.x, y: panStart.current.panY + event.clientY - panStart.current.y });
		}
	}

	function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
		const start = swipeStart.current;
		if (start && pointers.current.size === 1 && zoom === 1) {
			const deltaX = event.clientX - start.x;
			const deltaY = event.clientY - start.y;
			if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
				changeImage((selectedIndex! + (deltaX < 0 ? 1 : -1) + gallery.length) % gallery.length);
			}
		}
		pointers.current.delete(event.pointerId);
		if (pointers.current.size === 0) swipeStart.current = null;
		if (pointers.current.size < 2) pinchStart.current = null;
		if (pointers.current.size === 0) panStart.current = null;
	}

	useEffect(() => {
		if (selectedIndex === null) {
			return;
		}

		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setSelectedIndex(null);
			}
			if (event.key === "ArrowLeft") {
				setSelectedIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
				resetZoom();
			}
			if (event.key === "ArrowRight") {
				setSelectedIndex((current) => current === null ? null : (current + 1) % gallery.length);
				resetZoom();
			}
		}

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", closeOnEscape);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [selectedIndex, gallery.length]);

	useEffect(() => {
		if (selectedIndex === null) return;
		setPreviewLoading(true);
		thumbnailRefs.current[selectedIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
	}, [selectedIndex, gallery]);

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
							onClick={() => changeImage(index)}
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
											quality={75}
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
			{selectedImage && selectedIndex !== null && createPortal((
				<div
					className="gallery-lightbox fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/95 p-4 sm:p-8"
					role="dialog"
					aria-modal="true"
					aria-label={wedding.galleryPage.dialogLabel}
					onClick={(event) => {
						if (event.target === event.currentTarget) setSelectedIndex(null);
					}}
				>
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,217,229,0.13),transparent_42%)]" />
					<div
						className="relative z-10 flex min-h-[min(760px,calc(100vh-2rem))] w-full max-w-7xl flex-col justify-between gap-5 sm:min-h-[calc(100vh-4rem)]"
					>
						<div className="flex items-center justify-between text-surface-white">
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary-container">Bas &amp; Dila</p>
								<p className="mt-1 font-serif text-xl sm:text-2xl">Momen bahagia kami</p>
							</div>
							<button
								type="button"
								className="motion-press rounded-full border border-surface-white/20 bg-surface-white/10 p-3 text-surface-white backdrop-blur-md transition hover:bg-surface-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
								onClick={() => setSelectedIndex(null)}
								aria-label={wedding.galleryPage.closeLabel}
							>
								<X size={20} aria-hidden="true" />
							</button>
						</div>

						<div className="flex min-h-0 flex-1 items-center justify-center gap-2 sm:gap-6">
							<button
								type="button"
								className="motion-press hidden shrink-0 rounded-full border border-surface-white/20 bg-surface-white/10 p-3 text-surface-white backdrop-blur-md transition hover:bg-surface-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:block sm:p-4"
								onClick={(event) => { event.stopPropagation(); changeImage((selectedIndex - 1 + gallery.length) % gallery.length); }}
								aria-label="Foto sebelumnya"
							>
								<ChevronLeft size={24} aria-hidden="true" />
							</button>
							<div
								className="animate-modal-in relative flex h-[min(68vh,680px)] min-h-[300px] w-full max-w-5xl touch-none items-center justify-center overflow-hidden rounded-[1.5rem] border border-surface-white/20 bg-surface-white p-3 shadow-2xl shadow-black/30 sm:h-[min(72vh,680px)] sm:p-5"
								onClick={(event) => event.stopPropagation()}
								onWheel={(event) => { event.preventDefault(); changeZoom(event.deltaY < 0 ? 0.2 : -0.2); }}
								onPointerDown={handlePointerDown}
								onPointerMove={handlePointerMove}
								onPointerUp={handlePointerUp}
								onPointerCancel={handlePointerUp}
							>
								{previewLoadFailed ? (
									<div className="max-w-md text-center text-foreground">
										<p className="font-serif text-2xl">Foto tidak dapat dimuat</p>
										<p className="mt-2 break-all text-sm text-muted">{selectedImage.url}</p>
									</div>
								) : (
									<div className="relative z-10 h-full w-full" style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`, transition: pointers.current.size ? "none" : "transform 180ms ease-out" }}>
										<Image
											key={selectedImage.url}
											src={selectedImage.url}
											alt={`${wedding.galleryPage.imageAlt} dalam ukuran penuh`}
											fill
											sizes="(max-width: 640px) 100vw, 1200px"
											quality={90}
											draggable={false}
											onLoad={() => setPreviewLoading(false)}
											onError={() => { setPreviewLoading(false); setPreviewLoadFailed(true); }}
											onDoubleClick={resetZoom}
											className="select-none object-contain"
										/>
									</div>
								)}
								{previewLoading && <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-foreground/75 px-3 py-1 text-xs text-white">Memuat foto…</span>}
							</div>
							<button
								type="button"
								className="motion-press hidden shrink-0 rounded-full border border-surface-white/20 bg-surface-white/10 p-3 text-surface-white backdrop-blur-md transition hover:bg-surface-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container sm:block sm:p-4"
								onClick={(event) => { event.stopPropagation(); changeImage((selectedIndex + 1) % gallery.length); }}
								aria-label="Foto berikutnya"
							>
								<ChevronRight size={24} aria-hidden="true" />
							</button>
						</div>

						<div className="flex items-center justify-between gap-4 text-surface-white">
							<div>
								<p className="text-sm font-semibold">{String(selectedIndex + 1).padStart(2, "0")} <span className="mx-1 text-surface-white/40">/</span> {String(gallery.length).padStart(2, "0")}</p>
								<p className="mt-1 text-xs text-surface-white/60">Roda mouse untuk zoom · klik dua kali untuk mengubah pembesaran</p>
							</div>
							<div className="flex items-center gap-2">
								<button type="button" className="rounded-full border border-surface-white/20 bg-surface-white/10 p-2.5 text-surface-white transition hover:bg-surface-white/20 disabled:opacity-40" onClick={() => changeZoom(-0.25)} disabled={zoom <= minimumZoom} aria-label="Perkecil foto"><Minus size={18} /></button>
								<span className="min-w-12 text-center text-sm tabular-nums text-surface-white">{Math.round(zoom * 100)}%</span>
								<button type="button" className="rounded-full border border-surface-white/20 bg-surface-white/10 p-2.5 text-surface-white transition hover:bg-surface-white/20 disabled:opacity-40" onClick={() => changeZoom(0.25)} disabled={zoom >= maximumZoom} aria-label="Perbesar foto"><Plus size={18} /></button>
								<button type="button" className="rounded-full border border-surface-white/20 bg-surface-white/10 p-2.5 text-surface-white transition hover:bg-surface-white/20" onClick={resetZoom} aria-label="Atur ulang zoom"><RotateCcw size={17} /></button>
								<div className="ml-1 flex gap-2 sm:ml-3">
									<button type="button" className="rounded-full border border-surface-white/20 bg-surface-white/10 p-2.5 text-surface-white" onClick={() => changeImage((selectedIndex - 1 + gallery.length) % gallery.length)} aria-label="Foto sebelumnya"><ChevronLeft size={18} /></button>
									<button type="button" className="rounded-full border border-surface-white/20 bg-surface-white/10 p-2.5 text-surface-white" onClick={() => changeImage((selectedIndex + 1) % gallery.length)} aria-label="Foto berikutnya"><ChevronRight size={18} /></button>
								</div>
							</div>
						</div>

						<div className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-contain pb-1 [scrollbar-width:thin]" onClick={(event) => event.stopPropagation()}>
							{gallery.map((image, index) => (
								<button ref={(element) => { thumbnailRefs.current[index] = element; }} key={image.fileName} type="button" onClick={() => changeImage(index)} aria-label={`Lihat foto ${index + 1}`} aria-current={index === selectedIndex} className={`relative h-14 w-14 shrink-0 snap-center overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-16 ${index === selectedIndex ? "border-primary-container opacity-100" : "border-transparent opacity-50 hover:opacity-100"}`}>
									<Image src={image.url} alt="" fill sizes="64px" quality={50} className="object-cover" />
								</button>
							))}
						</div>
					</div>
				</div>
			), document.body)}
		</>
	);
}
