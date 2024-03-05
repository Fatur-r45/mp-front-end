import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import {
  deleteQuiz,
  getQuiz,
  quizSelectors,
  selectIsLoading,
} from "../../features/quiz";
import { useEffect } from "react";
import formatDate from "../../utils/dateFormater";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const quiz = useSelector(quizSelectors.selectAll);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);

  const renderQuiz = () => {
    return quiz.map((item, index) => {
      return (
        <tr
          key={item.id}
          className="hover:cursor-pointer hover:text-blue-900 ease-in-out hover:duration-200"
        >
          <th
            className="border border-slate-600"
            onClick={() => navigate(`quiz/${item.id}`)}
          >
            {index + 1}
          </th>
          <th className="border border-slate-600">{item.judul}</th>
          <th className="border border-slate-600">{item.deskripsi}</th>
          <th className="border border-slate-600">
            {formatDate(item.waktu_mulai)}
          </th>
          <th className="border border-slate-600">
            {formatDate(item.waktu_selesai)}
          </th>
          <th className="border border-slate-600">
            <div className="flex gap-2 justify-center font-normal">
              <Link
                to={`quiz/create/${item.id}`}
                className="btn btn-warning btn-outline"
              >
                Update
              </Link>
              <button
                onClick={() => dispatch(deleteQuiz(item.id))}
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
    <div className="mt-5 shadow-lg container p-5 rounded-md px-[10%]">
      <Link
        to="quiz/create"
        className="btn btn-primary rounded-xl px-2 py-1 my-5"
      >
        Add New
      </Link>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[50%]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul Quiz</th>
              <th>Deskripsi</th>
              <th>Mulai</th>
              <th>Selesai</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderQuiz()}</tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
