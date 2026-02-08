import type { Metadata } from "next";
import Link from "next/link";
import css from "./Home.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImageUrl =
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
    title: "NoteHub — Page not found",
    description:
        "This page does not exist. The resource you are looking for is missing.",
    openGraph: {
        title: "NoteHub — Page not found",
        description:
            "This page does not exist. The resource you are looking for is missing.",
        url: `${siteUrl}/not-found`,
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

const NotFound = () => {
    return(
        <>
            <h1 className={css.title}>
                404 - Page not found
            </h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/">Go back home</Link>
        </>
    )
}

export default NotFound;
