"use client"

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </>
  );
};

export default NotePreviewClient;
