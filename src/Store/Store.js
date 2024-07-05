import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Features/AuthSlice"

const store = configureStore({
    reducer: {
        Auth: AuthSlice
    }
})

export default store