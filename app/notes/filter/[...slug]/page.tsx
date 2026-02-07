import type { Metadata } from "next";
import { getCategories } from "@/lib/api";
import NotesClient from "./Notes.client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImageUrl =
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

type Props = {
    params: Promise<{ slug: string[] }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const filterLabel = slug.join(" / ");
    const title = `NoteHub — Filter: ${filterLabel}`;
    const description = `Browse notes filtered by ${filterLabel}.`;
    const url = `${siteUrl}/notes/filter/${slug.join("/")}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: "NoteHub preview",
                },
            ],
        },
    };
}

const NotePage = async ({ params }: Props) => {
    const { slug } = await params;
    const categories = await getCategories();
    return <NotesClient slug={slug} categories={categories} />;
};

export default NotePage;
