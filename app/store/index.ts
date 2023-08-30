import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { dataSlice } from "./dataFetch";

export const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware)
})
