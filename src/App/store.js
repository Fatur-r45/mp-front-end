import { configureStore } from "@reduxjs/toolkit";
import { auth, pertanyaan, quiz } from "../features";

export const store = configureStore({
  reducer: {
    quiz: quiz,
    pertanyaan: pertanyaan,
    auth: auth,
  },
});
