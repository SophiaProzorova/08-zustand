import { getCategories } from "@/lib/api";
import css from "./Sidebar.module.css";
import Link from "next/link";

const NotesSidebar = async () => {
    const categories = await getCategories();
    console.log("sidebar", categories)

    return(
        <>
            <ul className={css.menuList}>
                <li className={css.menuItem}>
                    <Link href="/notes/action/create" className={css.menuLink}>
                        Create Note
                    </Link>
                </li>
                <li className={css.menuItem}>
                    <Link href={`/notes/filter/all`} className={css.menuLink}>
                        All notes
                    </Link>
                </li>
                {categories.map((category) => (
                    <li className={css.menuItem} key={category.id}>
                        <Link href={`/notes/filter/${category.id}`} className={css.menuLink}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default NotesSidebar;
