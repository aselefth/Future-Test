import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    searchValue: string
}

const initialState: InitialState = {
    searchValue: ''
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<{searchValue: string}>) => {
            state.searchValue = action.payload.searchValue
        }
    }
})

export const {reducer: appReducer, actions: appActions} = appSlice