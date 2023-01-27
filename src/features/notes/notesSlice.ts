import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Note, url } from "../../utils/constants";



type NotesState = {
  notes: Note[],
  filterNotesArr:Note[] | null,
  status: 'init' | 'loading' | 'error' | 'success',
}

const initialState:NotesState = {
  notes: [],
  filterNotesArr: null,
  status: 'init',
}

export const getNotes = createAsyncThunk<Note[], undefined, {rejectValue: string}>('notes/getNotes', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${url}/notes.json`)
    const payload = Object.keys(res.data || {}).map(key => {
      return {
        ...res.data[key],
        id: key
        }
    })
    return payload
  } catch(e) {
    return rejectWithValue('Что-то пошло не так')
  }   
})

export const addNote = createAsyncThunk('notes/addNote', async (title: string, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${url}/notes.json`, {title, date: new Date().toJSON()})    
    const payload = {
      title,
      date: new Date().toJSON(),
      id: res.data.name
    }
    return payload
  } catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }
})

export const removeNote = createAsyncThunk('notes/removeNote', async(id: string, {rejectWithValue }) => {
  try {
    await axios.delete(`${url}/notes/${id}.json`);
    return id
  }
  catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }    
})

export const editNote = createAsyncThunk('notes/editNote', async({id, title}: {id: string, title: string}, {rejectWithValue }) => {
  try {
    await axios.put(`${url}/notes/${id}.json`, {title, date: new Date().toJSON()});    
    const payload = {
      title, 
      date: new Date().toJSON(),
      id,
    }
    return payload
  }
  catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }    
})


export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    sortInAscending(state, action:PayloadAction<string>) {
      state.filterNotesArr
      ? state.filterNotesArr.sort((a, b) => a[action.payload] > b[action.payload] ? 1 : -1)
      : state.notes.sort((a, b) => a[action.payload] > b[action.payload] ? 1 : -1)
    },
    sortInDescending(state, action: PayloadAction<string>) {
      state.filterNotesArr
      ? state.filterNotesArr.sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1)
      : state.notes.sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1)
    },
    filterNotes(state, action:PayloadAction<string>) {
      state.filterNotesArr = state.notes.filter(note => note.title.toLowerCase().includes(action.payload.toLowerCase()))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase (getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = 'success';
      })
      .addCase (getNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase (getNotes.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.status = 'success';
      })
      .addCase (addNote.pending, (state) => {
        state.status = 'init';
        state.filterNotesArr = null;
      })
      .addCase (addNote.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload)
        state.status = 'success';
      })
      .addCase (removeNote.pending, (state) => {
        state.status = 'init';
      })
      .addCase (removeNote.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (editNote.fulfilled, (state, action) => {
        state.notes.forEach(note => {
          if (note.id === action.payload.id) {
            note.date = action.payload.date  
            note.title = action.payload.title
            note.id = action.payload.id   
          }
        })
        state.filterNotesArr?.forEach(note => {
          if (note.id === action.payload.id) {
            note.date = action.payload.date  
            note.title = action.payload.title
            note.id = action.payload.id   
          }
        })
        state.status = 'success';
      })
      .addCase (editNote.pending, (state) => {
        state.status = 'init';
      })
      .addCase (editNote.rejected, (state) => {
        state.status = 'error';
      })
  }
})

export const { sortInAscending, sortInDescending, filterNotes } = notesSlice.actions
export default notesSlice.reducer