'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { Category, createNote, NewNoteData } from '@/lib/api';
import { NOTE_TAGS } from '@/lib/tags';
import { Schema } from './FormSchema';
import css from './NoteForm.module.css';
import useNoteDraftStore from '@/lib/store/noteStore';

type Props = {
  categories?: Category[];
  onClose?: () => void;
};

const initialValues = {
  title: '',
  content: '',
  tag: NOTE_TAGS[0].id,
};

const NoteForm = ({ categories = [], onClose = () => {} }: Props) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created');
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const handleSubmit = (values: NewNoteData) => {
    const payload: NewNoteData = {
      title: values.title.trim(),
      content: values.content.trim(),
      tag: values.tag.trim(),
    };
    mutate(payload);
  };

  const handleCancel = () => {
    onClose?.();
    router.push('/notes/filter/all');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
        ...draft,
        [event.target.name]: event.target.value
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.formGroup}>
            Title
            <Field className={css.input} type="text" name="title" />
            <ErrorMessage name="title" component="span" className={css.error} />
          </label>

          <label className={css.formGroup}>
            Content
            <Field className={css.textarea} as="textarea" name="content" />
            <ErrorMessage name="content" component="span" className={css.error} />
          </label>

          <label className={css.formGroup}>
            Category
            <Field className={css.select} as="select" name="tag">
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </label>

          <div className={css.actions}>
            <button
              className={css.submitButton}
              type="submit"
              disabled={isPending || isSubmitting}
            >
              Create
            </button>
            <button className={css.cancelButton} type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
