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

export const getPertanyaan = createAsyncThunk(
  "pertanyaan/getPertanyaan",
  async () => {
    const response = await axiosInstance.get("/pertanyaan");
    return response.data.data;
  }
);

export const getPertanyaanByid = createAsyncThunk(
  "pertanyaan/getPertanyaanByid",
  async (id) => {
    const response = await axiosInstance.get(`/pertanyaan/${id}`);
    return response.data.data;
  }
);
export const savePertanyaan = createAsyncThunk(
  "pertanyaan/savePertanyaan",
  async ({ pertanyaan, id_quiz, opsiA, opsiB, opsiC, opsiD, jawaban }) => {
    const response = await axiosInstance.post(
      "/pertanyaan",
      {
        pertanyaan,
        id_quiz,
        opsiA,
        opsiB,
        opsiC,
        opsiD,
        jawaban,
      },
      config
    );
    return response.data.data;
  }
);

export const deletePertanyaan = createAsyncThunk(
  "pertanyaan/deletePertanyaan",
  async (id) => {
    await axiosInstance.delete(`/pertanyaan/${id}`, config);
    return id;
  }
);

export const editPertanyaan = createAsyncThunk(
  "pertanyaan/editPertanyaan",
  async ({ id, pertanyaan, id_quiz, opsiA, opsiB, opsiC, opsiD, jawaban }) => {
    const response = await axiosInstance.put(
      `/pertanyaan/${id}`,
      {
        pertanyaan,
        id_quiz,
        opsiA,
        opsiB,
        opsiC,
        opsiD,
        jawaban,
      },
      config
    );
    return response.data.data;
  }
);

const pertanyaanEntity = createEntityAdapter({
  selectId: (pertanyaan) => pertanyaan.id,
});

const PertanyaanSlice = createSlice({
  name: "pertanyaan",
  initialState: pertanyaanEntity.getInitialState({
    isLoading: false,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getPertanyaan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPertanyaan.fulfilled, (state, action) => {
        pertanyaanEntity.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(getPertanyaanByid.fulfilled, (state, action) => {
        pertanyaanEntity.setOne(state, action.payload);
        state.isLoading = false;
      })
      .addCase(savePertanyaan.fulfilled, (state, action) => {
        pertanyaanEntity.addOne(state, action.payload);
      })
      .addCase(deletePertanyaan.fulfilled, (state, action) => {
        pertanyaanEntity.removeOne(state, action.payload);
      })
      .addCase(editPertanyaan.fulfilled, (state, action) => {
        pertanyaanEntity.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      });
  },
});

export const pertanyaanSelectors = pertanyaanEntity.getSelectors(
  (state) => state.pertanyaan
);

export const selectIsLoading = (state) => state.pertanyaan.isLoading;
export default PertanyaanSlice.reducer;
