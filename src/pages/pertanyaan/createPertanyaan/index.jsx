/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  pertanyaanSelectors,
  editPertanyaan,
  getPertanyaan,
  savePertanyaan,
} from "../../../features/pertanyaan";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const CreatePertanyaan = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const dataPertanyaan = useSelector((state) =>
    pertanyaanSelectors.selectById(state, params.id)
  );

  console.log(params);

  const [pertanyaan, setPertanyaan] = useState({});
  const [opsi, setOpsi] = useState("");

  const onSubmit = async (data, e) => {
    console.log(data);
    e.preventDefault();
    if (params.id) {
      const updatedData = {
        id: params.id,
        id_quiz: pertanyaan.id_quiz,
        ...data,
      };
      await dispatch(editPertanyaan(updatedData));
      navigate(-1);
    } else {
      const createData = {
        id_quiz: params.id_quiz,
        ...data,
      };
      await dispatch(savePertanyaan(createData));
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(getPertanyaan());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      if (dataPertanyaan) {
        setPertanyaan(dataPertanyaan);
        setOpsi(dataPertanyaan.opsi_jawaban.split("~"));
      }
    } else {
      setPertanyaan({});
    }
  }, [dataPertanyaan]);

  return (
    <>
      <div className="w-full flex justify-center overflow-y-auto pl-[10%] pr-[40%]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Pertanyaan</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Pertanyaan"
              defaultValue={pertanyaan.pertanyaan}
              {...register("pertanyaan", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            />
          </label>

          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Opsi Pertanyaan A</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Opsi A"
              defaultValue={opsi[0]}
              {...register("opsiA", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            ></input>
          </label>

          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Opsi Pertanyaan B</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Opsi B"
              defaultValue={opsi[1]}
              {...register("opsiB", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            ></input>
          </label>

          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Opsi Pertanyaan C</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Opsi C"
              defaultValue={opsi[2]}
              {...register("opsiC", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            ></input>
          </label>

          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Opsi Pertanyaan D</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Opsi D"
              defaultValue={opsi[3]}
              {...register("opsiD", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            ></input>
          </label>

          <label className="form-control w-full flex flex-row justify-between items-center my-2">
            <div className="label">
              <span className="label-text">Jawaban</span>
            </div>
            <input
              type="number"
              placeholder="Masukan Jawaban"
              defaultValue={pertanyaan.jawaban_benar}
              {...register("jawaban", { required: true, maxLength: 100 })}
              className="input input-bordered w-[80%]"
            ></input>
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-4 py-2 cursor-pointer modal-action"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePertanyaan;
