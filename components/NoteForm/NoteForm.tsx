'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Category, createNote, NewNoteData } from '@/lib/api';
import css from './NoteForm.module.css';

type Props = {
  categories?: Category[];
  onClose?: () => void;
};

const NoteForm = ({ categories = [], onClose }: Props) => {
	const router = useRouter();
    const hasTodo = categories.some((category) => category.id === "Todo");
    const categoryOptions = hasTodo
        ? categories
        : [
            {
                id: "Todo",
                name: "Todo",
                description: "",
                createdAt: "",
                updatedAt: "",
            },
            ...categories,
        ];
    const defaultTag = "Todo";
	
    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
        toast.success('Note created');
        if (onClose) {
          onClose();
          return;
        }
        router.push('/notes/filter/all');
        },
        onError: () => {
            toast.error('Failed to create note');
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData) as Record<string, string>;
        const payload: NewNoteData = {
            title: values.title?.trim() ?? "",
            content: values.content?.trim() ?? "",
            tag: values.tag?.trim() || defaultTag,
        };
        mutate(payload);
    };

    const handleCancel = () => {
        if (onClose) {
            onClose();
            return;
        }
        router.push('/notes/filter/all');
    };
    
    return (
        <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.formGroup}>
            Title
            <input className={css.input} type="text" name="title" />
        </label>

        <label className={css.formGroup}>
            Content
            <textarea className={css.textarea} name="content"></textarea>
        </label>

        <label className={css.formGroup}>
            Category
            <select className={css.select} name="tag" defaultValue={defaultTag}>
                {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                ))}
            </select>
        </label>

        <div className={css.actions}>
            <button className={css.submitButton} type="submit" disabled={isPending}>Create</button>
            <button className={css.cancelButton} type="button" onClick={handleCancel}>Cancel</button>
        </div>
        </form>
    );
};

export default NoteForm;
