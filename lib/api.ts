import type { Note } from "@/types/note";
import type { Category } from "@/types/category";
import { NOTE_TAGS } from "@/lib/tags";
import axios from "axios";

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}
export type NoteListResponse = {
    notes: Note[],
};

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

export type { Category };

const noteHubAPIUrl = `https://notehub-public.goit.study/api/notes`;
const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`    
};

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers,
});

export const getNotes = async (categoryId?: string) => {
    const res = await api.get<NoteListResponse>('/notes', {
        params: { tag: categoryId },
    });

    return res.data;
}

export const fetchNoteById = async (id: string) => {
    const res = await axios.get<Note>(`${noteHubAPIUrl}/${id}`, { headers });

    return res.data;
}


export const  fetchNotes = async (search: string, page: number, tag?: string): Promise<FetchNotesResponse> => {
    const options = {
        headers: headers,
        params: {
            search: search,
            page: page,
            perPage: 10,
            ...(tag ? { tag: tag } : {})
        }
    }

    const response = await axios.get<FetchNotesResponse>(
        noteHubAPIUrl,
        options
    );

    return ({
        notes: response.data.notes,
        totalPages: response.data.totalPages
    })
    
};


export const createNote = async (data: NewNoteData): Promise<Note> => {
    const response =  await axios.post<Note>(
        noteHubAPIUrl,
        data,
        {headers}
    );
    
    return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
    const url = `${noteHubAPIUrl}/${noteId}`;

    const response = await axios.delete<Note>(
        url,
        {headers: headers}
    );

    return response.data;
};

export const getCategories = async () => {
    return NOTE_TAGS;
}
