import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeNotesByBoardId as deleteNotesFromAppwrite,
  createNote as addNoteToService, // Renamed to avoid conflict
  getNotes,
  deleteNote,
  updateNote,
} from "../appwrite/notesService";

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

// Async thunk for creating a new note
export const createNote = createAsyncThunk(
  "notes/addNote",
  async ({ boardId, noteName, noteText }) => {
    return await addNoteToService(boardId, noteName, noteText);
  }
);

// Async thunk for fetching notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (boardId) => {
    const response = await getNotes(boardId);
    return response.documents; // Directly returning the response
  }
);

// Async thunk for updating a note
export const modifyNote = createAsyncThunk(
  "notes/modifyNote",
  async ({ noteId, data }) => {
    return await updateNote(noteId, data);
  }
);

// Async thunk for deleting a note
export const removeNote = createAsyncThunk(
  "notes/removeNote",
  async (noteId) => {
    await deleteNote(noteId);
    return noteId;
  }
);
// Async thunk to remove notes by boardId
export const removeNotesByBoardId = createAsyncThunk(
  'notes/removeNotesByBoardId',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await deleteNotesFromAppwrite(boardId);
      return { boardId, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to fetch notes: ${action.error.message}`;
      })
      // Add note
      .addCase(createNote.pending, (state) => { // Updated to match the thunk name
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload); // Add the new note to the state
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to add note: ${action.error.message}`;
      })
      // Update note
      .addCase(modifyNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(
          (note) => note.$id === action.payload.$id
        );
        if (index !== -1) {
          state.notes[index] = action.payload; // Update the note in the state
        }
      })
      .addCase(modifyNote.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to update note: ${action.error.message}`;
      })
      // Delete note
      .addCase(removeNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((note) => note.$id !== action.payload);
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to delete note: ${action.error.message}`;
      })
      // remove all Notes of deleteed board
      .addCase(removeNotesByBoardId.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeNotesByBoardId.fulfilled, (state, action) => {
        state.loading = false;
        // Remove notes associated with the boardId from state
        state.notes = state.notes.filter(note => note.boardId !== action.payload.boardId);
      })
      .addCase(removeNotesByBoardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notesSlice.reducer; // Don't forget to export the reducer
