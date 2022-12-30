import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: {'example@mail.ru': {
        firstName: 'Danil',
        lastName: 'Bugaenko',
        password: 'qwerty12345',
        company: 'Uno',
        resolution: 'admin'
    },
    'example1@mail.ru':{
        firstName: 'Ivan',
        lastName: 'Ivanov',
        password: 'qwerty12345',
        company: 'Umag',
        resolution: 'user'
    }},
    authUser: "none"
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const {mail} = action.payload;
            
            state.authUser = mail;
        }
    }
})

export const authSliceActions = authSlice.actions