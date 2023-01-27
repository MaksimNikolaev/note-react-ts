import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "../features/alert/alertSlice";
import notesSlice from "../features/notes/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesSlice,
    alert: alertSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch