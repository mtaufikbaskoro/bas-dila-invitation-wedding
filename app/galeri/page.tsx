import { GalleryGrid } from "@/components/gallery-grid";
import { FloralDecoration } from "@/components/floral-decoration";
import { PageFrame } from "@/components/page-frame";
import { getGalleryImages } from "@/lib/gallery";
import { wedding } from "@/lib/wedding";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
	const gallery = await getGalleryImages();

	return (
		<PageFrame>
			<main className="relative mx-auto max-w-4xl overflow-hidden px-6 py-16 sm:px-10">
				<FloralDecoration asset="green-white-leaves" className="-left-12 top-6 h-36 w-24 opacity-45 sm:left-0 sm:h-44 sm:w-28" />
				<FloralDecoration asset="brown-white-leaves" className="-right-12 top-6 h-36 w-24 opacity-45 sm:right-0 sm:h-44 sm:w-28" />
				<header className="relative z-10 mx-auto mb-16 max-w-xl text-center">
					<h1 className="font-serif text-5xl font-bold text-primary">{wedding.galleryPage.title}</h1>
					<p className="mt-4 text-lg text-muted">{wedding.galleryPage.description}</p>
					<div className="mx-auto mt-8 h-px w-16 bg-primary-container" />
				</header>
				<div className="relative z-10">
					<GalleryGrid gallery={gallery} />
				</div>
			</main>
		</PageFrame>
	);
}