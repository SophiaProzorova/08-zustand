import NotesSidebar from "../filter/@sidebar/default";
import css from "../filter/LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
};

const NotesActionLayout = ({ children }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        <NotesSidebar />
      </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesActionLayout;
