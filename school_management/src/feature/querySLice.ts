import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IProductQuery } from '../types/IQuery';

interface State {
    query: IProductQuery;
}
const initialState: State = {
    query: {
        _limit: 10,
        _page: 1,
        q: '',
        sex: '',
        class: '',
    },
};
export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQueryFilter: (state, action: PayloadAction<IProductQuery>) => {
            console.log({ ...state.query, ...action.payload });
            state.query = { ...state.query, ...action.payload };
        },
        resetQueryFilter: (state) => {
            state.query = initialState.query;
        },
    },
});
const queryReducer = querySlice.reducer;
export const { setQueryFilter, resetQueryFilter } = querySlice.actions;
export default queryReducer;
