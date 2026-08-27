import { GalleryGrid } from "@/components/gallery-grid";
import { PageFrame } from "@/components/page-frame";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
	const gallery = await getGalleryImages();

	return (
		<PageFrame>
			<main className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
				<header className="mx-auto mb-16 max-w-xl text-center">
					<h1 className="font-serif text-5xl font-bold text-primary">Galeri Foto</h1>
					<p className="mt-4 text-lg text-muted">Momen-momen indah perjalanan cinta kami.</p>
					<div className="mx-auto mt-8 h-px w-16 bg-primary-container" />
				</header>
				<GalleryGrid gallery={gallery} />
			</main>
		</PageFrame>
	);
}