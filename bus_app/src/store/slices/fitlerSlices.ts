import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TripFilter } from '../../interfaces/filter';

const initialState: TripFilter = {
    max_price: 0,
    start_time: [],
    merchants: [],
    transports: []
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<TripFilter>) => action.payload,
        clearFilter: () => initialState
    }
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
