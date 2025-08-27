import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  register: false,
  payments: false,
  multiStepCreator: false,
  promotionPopup: false,
  currentStep: 0,
};

export const cta = createSlice({
  name: "cta",
  initialState,
  reducers: {
    setRegisterOpen: (state, action) => {
      state.register = action.payload;
    },
    setPaymentsOpen: (state, action) => {
      state.payments = action.payload;
    },
    setMultiStepCreatorOpen: (state, action) => {
      state.multiStepCreator = action.payload;
    },
    setPromotionPopupOpen: (state, action) => {
      state.promotionPopup = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { 
  setRegisterOpen, 
  setPaymentsOpen, 
  setMultiStepCreatorOpen, 
  setPromotionPopupOpen,
  setCurrentStep 
} = cta?.actions;

export default cta?.reducer;
