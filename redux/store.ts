import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import allBloodBanks from "./features/allBloodBanks";
import allEvents from "./features/allEvents";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer,
        allBloodBanks,
        allEvents,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useBBSelector: TypedUseSelectorHook<RootState> = useSelector