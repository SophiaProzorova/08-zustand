import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImageUrl =
  "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const url = `${siteUrl}/notes/${id}`;

  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} — NoteHub`;
    const description =
      note.content.length > 160
        ? `${note.content.slice(0, 157)}...`
        : note.content;

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
  } catch {
    const title = "NoteHub — Note not found";
    const description =
      "The note you are looking for does not exist or is no longer available.";

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
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
};

export default NoteDetails;
