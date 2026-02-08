import type { Metadata } from "next";
import { getCategories } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreatePage.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImageUrl =
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
    title: "NoteHub — Create a note",
    description:
        "Create a new note in NoteHub and keep everything organized in one place.",
    openGraph: {
        title: "NoteHub — Create a note",
        description:
            "Create a new note in NoteHub and keep everything organized in one place.",
        url: `${siteUrl}/notes/action/create`,
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

const CreateNote = async() => {
    const categories = await getCategories();

    return (
        <section className={css.page}>
            <div className={css.card}>
                <div className={css.header}>
                    <h1 className={css.title}>Create a note</h1>
                    <p className={css.subtitle}>
                        Add a new note and keep everything organized.
                    </p>
                </div>
                <NoteForm categories={categories} />
            </div>
        </section>
    );
};

export default CreateNote;
