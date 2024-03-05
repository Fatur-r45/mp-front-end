import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

const token = JSON.parse(localStorage.getItem("token"));

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getQuiz = createAsyncThunk("quiz/getQuiz", async () => {
  const response = await axiosInstance.get("/quiz");
  return response.data.data;
});

export const getQuizByid = createAsyncThunk("quiz/getQuizByid", async (id) => {
  const response = await axiosInstance.get(`/quiz/${id}`);
  return response.data.data;
});

export const saveQuiz = createAsyncThunk(
  "quiz/saveQuiz",
  async ({ judul, deskripsi, mulai, selesai }) => {
    const response = await axiosInstance.post(
      "/quiz",
      {
        judul,
        deskripsi,
        mulai,
        selesai,
      },
      config
    );
    return response.data.data;
  }
);

export const deleteQuiz = createAsyncThunk("quiz/deleteQuiz", async (id) => {
  await axiosInstance.delete(`/quiz/${id}`, config);
  return id;
});

export const editQuiz = createAsyncThunk(
  "quiz/editQuiz",
  async ({ id, judul, deskripsi, mulai, selesai }) => {
    const response = await axiosInstance.put(
      `/quiz/${id}`,
      {
        judul,
        deskripsi,
        mulai,
        selesai,
      },
      config
    );
    return response.data.data;
  }
);

const quizEntity = createEntityAdapter({
  selectId: (quiz) => quiz.id,
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: quizEntity.getInitialState({
    isLoading: false,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        quizEntity.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(getQuizByid.fulfilled, (state, action) => {
        quizEntity.setOne(state, action.payload);
        state.isLoading = false;
      })
      .addCase(saveQuiz.fulfilled, (state, action) => {
        quizEntity.addOne(state, action.payload);
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        quizEntity.removeOne(state, action.payload);
      })
      .addCase(editQuiz.fulfilled, (state, action) => {
        quizEntity.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      });
  },
});

export const quizSelectors = quizEntity.getSelectors((state) => state.quiz);

export const selectIsLoading = (state) => state.quiz.isLoading;
export default quizSlice.reducer;
