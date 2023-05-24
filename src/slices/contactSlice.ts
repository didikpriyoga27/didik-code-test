import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import axios from 'axios';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

interface ContactState {
  contacts: Contact[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const baseUrl = 'https://contact.herokuapp.com/contact';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(baseUrl);
    return response.data.data as Contact[];
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id: number) => {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
  },
);

const initialState: ContactState = {
  contacts: [],
  status: 'idle',
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload,
        );
      });
  },
});

export default contactSlice.reducer;

export const selectContacts = (state: RootState) => state.contacts.contacts;
