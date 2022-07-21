import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteContact, filterContacts, getFromApi, postInApi, removeFromApi } from "./actions";
import { contactsApi } from "api/contactsApi";

const initialState = {
  items: [],
  filter: '',
  status: 'idle',
};

export const fetchContacts = createAsyncThunk(getFromApi, async () => { 
  const response = await contactsApi.get('contacts');
  return response.data;
});
export const saveContact = createAsyncThunk(postInApi, async (contact) => { 
  const response = await contactsApi.post('contacts', contact);
  return response.data;
});
export const removeContact = createAsyncThunk(removeFromApi, async (contactId) => { 
  const response = await contactsApi.delete(`contacts/${contactId}`);
  return response.data;
});

export const contactsReducer = createReducer(initialState, builder => {
  builder
    .addCase(deleteContact, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    })
    .addCase(filterContacts, (state, action) => {
      state.filter = action.payload;
    })

    .addCase(fetchContacts.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = [...action.payload];
      state.status = 'idle';
    })
    .addCase(saveContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(saveContact.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
      state.status = 'idle';
    })
    .addCase(removeContact.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(removeContact.fulfilled, (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      state.status = 'idle';
    })
    .addDefaultCase((state, action) => {})
});