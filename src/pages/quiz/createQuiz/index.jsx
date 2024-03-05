/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  editQuiz,
  getQuiz,
  quizSelectors,
  saveQuiz,
} from "../../../features/quiz";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EditQuiz = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [judul, setjudul] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const quiz = useSelector((state) => quizSelectors.selectById(state, id));

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (id) {
      const updatedData = {
        id: id,
        ...data,
      };
      await dispatch(editQuiz(updatedData));
      navigate("/");
    } else {
      const createData = {
        ...data,
      };
      await dispatch(saveQuiz(createData));
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      if (quiz) {
        setjudul(quiz.judul);
        setdeskripsi(quiz.deskripsi);
      }
    } else {
      setjudul("");
      setdeskripsi("");
    }
  }, [quiz]);

  return (
    <>
      <div className="w-[50%] flex justify-center overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Judul</span>
            </div>
            <input
              type="text"
              placeholder="Masukan Judul"
              defaultValue={judul}
              {...register("judul", { required: true, maxLength: 20 })}
              className="input input-bordered w-full "
            />
            {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Deskripsi</span>
            </div>
            <textarea
              name="Deskripsi"
              id="Deskripsi"
              cols="30"
              rows="10"
              placeholder="Masukan Deskripsi"
              defaultValue={deskripsi}
              {...register("deskripsi", { required: true, maxLength: 100 })}
              className="input input-bordered w-full "
            ></textarea>
            {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Mulai</span>
            </div>
            <input
              type="date"
              placeholder="mulai"
              {...register("mulai", { required: true })}
              className="input input-bordered w-full "
            />
            {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Selesai</span>
            </div>
            <input
              type="date"
              placeholder="Selesai"
              {...register("selesai", { required: true })}
              className="input input-bordered w-full "
            />
            {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
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

export default EditQuiz;
