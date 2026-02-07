import { getCategories } from "@/lib/api";
import NoteForm from '@/components/NoteForm/NoteForm';
import css from "./CreatePage.module.css";

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

export default CreateNote
