'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { Category, createNote, NewNoteData } from '@/lib/api';
import { Schema } from './FormSchema';
import css from './NoteForm.module.css';
import useNoteDraftStore, { initialDraft } from '@/lib/store/noteStore';

type Props = {
  categories?: Category[];
  onClose?: () => void;
};

const NoteForm = ({ categories = [], onClose = () => {} }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [formInitialValues] = useState<NewNoteData>(() => ({
    ...initialDraft,
    ...draft,
    tag: draft.tag || initialDraft.tag,
  }));

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onClose();
      router.back();
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
    onClose();
    router.back();
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={Schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, isSubmitting, handleChange }) => {
        const handleFieldChange = (
          event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          handleChange(event);
          const { name, value } = event.target;
          setDraft({
            ...values,
            [name]: value,
          });
        };

        return (
        <Form className={css.form}>
          <label className={css.formGroup}>
            Title
            <Field
              className={css.input}
              type="text"
              name="title"
              onChange={handleFieldChange}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </label>

          <label className={css.formGroup}>
            Content
            <Field
              className={css.textarea}
              as="textarea"
              name="content"
              onChange={handleFieldChange}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </label>

          <label className={css.formGroup}>
            Category
            <Field
              className={css.select}
              as="select"
              name="tag"
              onChange={handleFieldChange}
            >
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
        );
      }}
    </Formik>
  );
};

export default NoteForm;
