import { persist } from "zustand/middleware";
import { NewNoteData } from "../api";
import { create } from "zustand";

type NoteDraftStore = {
    draft: NewNoteData;
    setDraft: (note: NewNoteData) => void;
    clearDraft: () => void;
};

export const initialDraft: NewNoteData = {
    title: "",
    content: "",
    tag: "Todo",
};

const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set(() => ({ draft: note })),
            clearDraft: () => set(() => ({ draft: initialDraft })),
        }),
        {
            name: "note-draft",
            partialize: (state) => ({
                draft: state.draft,
            }),
        }
    )
);

export default useNoteDraftStore;
