import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEnglish: true,
    isVietnamese: false,
};

const languageSlice = createSlice({
    name: 'language',
    initialState, 
    reducers: {
        toggleLanguage: (state) => {
            state.isEnglish = !state.isEnglish;
            state.isVietnamese = !state.isVietnamese;
        },    
    }
})

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
