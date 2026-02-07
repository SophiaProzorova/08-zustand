import css from "./LayoutNotes.module.css";

type Props = {
    children: React.ReactNode,
    sidebar: React.ReactNode
};

const Layout = (props: Props) => {
    return(
        <section className={css.container}>
            <aside className={css.sidebar}>{props.sidebar}</aside>
            <div className={css.notesWrapper}>{props.children}</div>
        </section>
    )
};

export default Layout;