import { IUser } from "src/types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IndexedDB from "src/services/db";

interface UserState {
    db: IndexedDB;
    user: IUser | null;
    isAuth: boolean;
    error: string;
    API_KEY: string;
}

const initialState: UserState = {
    db: new IndexedDB("user", 1),
    user: null,
    isAuth: false,
    error: "",
    API_KEY: "your_key",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuth = false;
            state.user = null;
        },
    },
});

export default userSlice.reducer;
