import Modal from "./Modal";
import { fetchNoteById } from "@/lib/api";

type Props = {
    params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) =>  {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return (
        <Modal>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
        </Modal>
    )
};

export default NotePreview;
