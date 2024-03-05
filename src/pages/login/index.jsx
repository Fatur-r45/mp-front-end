import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", data);
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    // dispatch(login(data));
    // localStorage.setItem("isAuthenticated", true);
    // localStorage.setItem("user", JSON.stringify(data));

    // console.log(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="email"
            {...register("email", { required: true, maxLength: 20 })}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true, maxLength: 20 })}
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <button type="submit" className="mt-10 w-full btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/register" className="capitalize underline hover:text-blue-300">
        register
      </Link>
    </div>
  );
}
