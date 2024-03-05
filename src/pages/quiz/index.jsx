import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuizByid, quizSelectors } from "../../features/quiz";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import formatDate from "../../utils/dateFormater";
import { Link } from "react-router-dom";
import { getPertanyaan } from "../../features/pertanyaan";

const DetailQuiz = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [judul, setjudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");
  const [pertanyaan, setPertanyaan] = useState([]);
  const quiz = useSelector((state) => quizSelectors.selectById(state, id));
  useEffect(() => {
    dispatch(getQuizByid(id));
    dispatch(getPertanyaan());
  }, [dispatch]);
  useEffect(() => {
    if (quiz) {
      setjudul(quiz.judul);
      setDeskripsi(quiz.deskripsi);
      setMulai(quiz.waktu_mulai);
      setSelesai(quiz.waktu_selesai);
      setPertanyaan(quiz.pertanyaan);
    }
  }, [quiz]);

  //   const sortedData = .sort((a, b) => a.id - b.id);

  const renderPertanyaan = () => {
    return [...pertanyaan]
      .sort((a, b) => a.id - b.id)
      .map((item, index) => {
        return (
          <tr
            key={item.id}
            className="hover:cursor-pointer hover:text-blue-900 ease-in-out hover:duration-200"
            //   onClick={() => navigate(`quiz/${item.id}`)}
          >
            <th className="border border-slate-600">{index + 1}</th>
            <th className="border border-slate-600">{item.pertanyaan}</th>
            <th className="border border-slate-600">{item.opsi_jawaban}</th>
            <th className="border border-slate-600 capitalize">
              {["a", "b", "c", "d"][item.jawaban_benar - 1]}
            </th>
            <th className="border border-slate-600">
              <div className="flex gap-2 justify-center font-normal">
                <Link
                  to={`../../pertanyaan/create/${item.id}`}
                  className="btn btn-warning btn-outline"
                >
                  Update
                </Link>
                <button
                  // onClick={() => dispatch(deleteQuiz(item.id))}
                  className="btn btn-error btn-outline"
                >
                  Delete
                </button>
              </div>
            </th>
          </tr>
        );
      });
  };

  return (
    <div className="container px-[10%]">
      <h2 className="text-xl font-semibold capitalize">{judul}</h2>
      <div className="flex justify-between items-baseline px-5">
        <p className="text-lg">{deskripsi}</p>
        <div className="flex justify-end gap-5">
          <div className="flex flex-col">
            <p>Mulai</p>
            <p>{formatDate(mulai)}</p>
          </div>
          <span className="w-[4px] bg-slate-500 rounded-md"></span>
          <div className="flex flex-col">
            <p>Selesai</p>
            <p>{formatDate(selesai)}</p>
          </div>
        </div>
      </div>
      {pertanyaan.length == 10 ? (
        <p className="capitalize">Limit Pertanyaan sudah terpenuhi</p>
      ) : (
        <Link
          to={`../quiz/pertanyaan/create/${id}`}
          className="btn btn-primary btn-outline"
        >
          Tambah Pertanyaan
        </Link>
      )}
      <div className="my-5 w-full">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Pertanyaan</th>
              <th>Opsi Pertanyaan</th>
              <th>jawaban</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderPertanyaan()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailQuiz;
