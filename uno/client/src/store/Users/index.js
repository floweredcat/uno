import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  status: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startLoading: () => {
      return {
        entities: [],
        status: 'loading',
      };
    },
    successLoading: (state, action) => {
      const { entities } = action.payload;
      return {
        entities,
        status: 'success',
      };
    },
    failLoading: () => {
      return {
        entities: [],
        status: 'fail',
      };
    },
    addUser: (state, action) => {
        const {email, name, phone, city, password, role, balance} = action.payload;

        state.entities.push({email, name, phone, city, password, role, balance})

        return state
    },
  },
});

export const usersSliceActions = usersSlice.actions;
