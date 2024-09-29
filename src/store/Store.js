import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import notesReducer from "../features/notesSlice";
import boardsReducer from "../features/boardSlice";
export default configureStore({
  reducer: {
    auth: userReducer,
    notes: notesReducer,
    boards: boardsReducer,
  },
});
