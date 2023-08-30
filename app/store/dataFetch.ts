import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const BASE_URL = "https://api.github.com/"
export const fetchData = createAsyncThunk('data/fetch', async (username) => {
	try {
		const response = await fetch(`${BASE_URL}users/${username}`);
		const data = await response.json();
		return data;
	} catch(err) {
		console.log(err)
	}
});

export const dataSlice = createSlice({
	name: 'data',
	initialState: {
		loading: false,
		data: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default dataSlice.reducer;
