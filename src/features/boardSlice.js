import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../appwrite/boardService";

// Initial state
const initialState = {
  boards: [],
  activeBoard: null,
  loading: false,
  error: null,
};

// Async thunk for fetching boards
export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (userId) => {
    const response = await getBoards(userId);
    const boards=response.documents
     const activeBoard = boards.find((board) => board.isActive);
     if (activeBoard) {
      return {boards,activeBoard}
    }
    return {boards,Null} // Assuming the API response contains a documents field
  }
);

// Async thunk for creating a new board
export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async ({ userId, boardName }) => {
    const response = await createBoard(userId, boardName);
    return response;
  }
);

// Async thunk for updating a board
export const modifyBoard = createAsyncThunk(
  "boards/modifyBoard",
  async ({ boardId, boardName }) => {
    const data = { boardName }; // Ensure data structure matches what Appwrite expects
    await updateBoard(boardId, data);
    return { boardId, boardName }; // Return the updated board data
  }
);

// Async thunk for deleting a board
export const removeBoard = createAsyncThunk(
  "boards/removeBoard",
  async (boardId) => {
    await deleteBoard(boardId); // No need to return the response
    return boardId; // Return the boardId to update the state
  }
);

// Async thunk for setting the active board
export const setActiveBoard = createAsyncThunk(
  "boards/setActiveBoard",
  async (boardId, { getState }) => {
    const { boards } = getState().boards; // Access boards from state

    // Mark the selected board as active
    const updatedBoard = await updateBoard(boardId, { isActive: true });

    // Mark all other boards as inactive
    await Promise.all(
      boards
        .filter((board) => board.$id !== boardId)
        .map((board) => updateBoard(board.$id, { isActive: false }))
    );

    return updatedBoard; // Return the updated active board
  }
);

// Create the slice
const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        const {boards,activeBoard}= action.payload
        state.boards = boards;
        state.activeBoard = activeBoard;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to fetch boards: ${action.error.message}`;
      })
      // Add board
      .addCase(addBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to add board: ${action.error.message}`;
      })
      // Update board
      .addCase(modifyBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyBoard.fulfilled, (state, action) => {
        state.loading = false;
        const { boardId, boardName } = action.payload;
        const board = state.boards.find((board) => board.$id === boardId);
        if (board) {
          board.boardName = boardName; // Update the board name in the state
        }
        if (state.activeBoard && state.activeBoard.$id === boardId) {
          state.activeBoard = { ...state.activeBoard, boardName }; // Update active board name
        }
      })
      .addCase(modifyBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to update board: ${action.error.message}`;
      })
      // Set active board
      .addCase(setActiveBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(setActiveBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.activeBoard = action.payload; // Set the active board in the state
        state.boards = state.boards.map((board) =>
          board.$id === action.payload.$id
            ? { ...board, isActive: true }
            : { ...board, isActive: false }
        );
      })
      .addCase(setActiveBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to set active board: ${action.error.message}`;
      })
      // Remove board
      .addCase(removeBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = state.boards.filter(
          (board) => board.$id !== action.payload // Use the boardId returned in the action.payload
        );
        state.activeBoard=null
      })
      .addCase(removeBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = `Failed to delete board: ${action.error.message}`;
      });
  },
});

export default boardsSlice.reducer;
