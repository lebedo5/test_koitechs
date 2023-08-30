import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = "https://api.github.com/";
export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({baseUrl}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (username) => `users/${username}`,
		}),
	}),

})

export const { useGetUserQuery } = apiSlice;
