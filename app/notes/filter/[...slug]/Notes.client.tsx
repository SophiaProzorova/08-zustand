"use client";

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from "@/lib/api"
import type { Note } from '@/types/note';
import type { Category } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from 'use-debounce';

import css from './NotesPage.module.css';

type Props = {
  slug: string[];
  categories: Category[];
}

function NotesClient({ slug, categories }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const tag = slug[0] === "all" ? undefined : slug[0];

  const updateSearchQuery = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, 300);

  const openModal = () =>  setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchQuery(e);
  }

  const { data } = useQuery({
    queryKey: ['notes', tag, currentPage, searchQuery],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.totalPages ?? 0;
  const notes: Note[] = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchSubmit}/>
        {totalPages > 1 && <Pagination onPageChange={({ selected }) => setCurrentPage(selected + 1)} totalPages={totalPages} forcePage={currentPage - 1} />}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm categories={categories} onClose={closeModal} />
        </Modal>
      )}
      {notes?.length > 0 && <NoteList notes={notes} />}
    </div>
  )
}

export default NotesClient
