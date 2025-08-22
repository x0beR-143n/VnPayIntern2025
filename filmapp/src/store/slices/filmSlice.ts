import { createSlice } from '@reduxjs/toolkit';
import { PaymentInfoType } from '../../interfaces/payment';

const initialState: PaymentInfoType = {
  filmName: "",
  duration: 0,
  sessionTime: "",
  roomName: "",
  selectedSeats: [],
  cinemaName: "",
  ticket_type: "",
  price_per_ticket: 0,
  foodCombo: [],
  discountValue: 0,
};

const filmSlice = createSlice({
    name: 'film',
    initialState,
    reducers: {
        setFilmSession: (state, action) => {
            state.filmName = action.payload.filmName;
            state.duration = action.payload.duration;
            state.sessionTime = action.payload.sessionTime;
            state.roomName = action.payload.roomName;
            state.selectedSeats = action.payload.selectedSeats;
            state.cinemaName = action.payload.cinemaName;
            state.ticket_type = action.payload.ticket_type;
            state.price_per_ticket = action.payload.price_per_ticket;
        },
        setFoodCombo: (state, action) => {
            state.foodCombo = action.payload;
        },
        setDiscountValue: (state, action) => {
            state.discountValue = action.payload;
        }
    }
});

export const { setFilmSession, setFoodCombo, setDiscountValue } = filmSlice.actions;
export default filmSlice.reducer;




