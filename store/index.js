import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/root-reducer";

export const store = configureStore({
    reducer:rootReducer,
    devTools:process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
});