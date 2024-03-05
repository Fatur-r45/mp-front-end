import { Layout } from "../components/molecule";
import { Routes, Route } from "react-router-dom";
import { CreatePertanyaan, CreateQuiz, DetailQuiz, Home } from "../pages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
        <Route path="/quiz/create/:id" element={<CreateQuiz />} />
        <Route
          path="quiz/pertanyaan/create/:id_quiz"
          element={<CreatePertanyaan />}
        />
        <Route path="/pertanyaan/create/:id" element={<CreatePertanyaan />} />
      </Routes>
    </Layout>
  );
};

export default MainPage;
