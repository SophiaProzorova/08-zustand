import Link from "next/link";
import css from "./Home.module.css";

const HomePage = () => {
  return (
    <main className={css.main}>
      <section className={css.container}>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.description}>
          Create, search, and organize your notes in one place.
        </p>
        <Link href="/notes/filter/all">Go to Notes</Link>
      </section>
    </main>
  );
};

export default HomePage;
