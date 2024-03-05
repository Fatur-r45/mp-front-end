import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit } = useForm();
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const onSubmit = () => {
    // dispatch(login(data));
    // localStorage.setItem("isAuthenticated", true);
    // localStorage.setItem("user", JSON.stringify(data));
    // navigate("/");
    console.log("hello world");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Nama</span>
          </div>
          <input
            type="text"
            placeholder="Masukan Nama"
            {...register("nama", { required: true, maxLength: 20 })}
            className="input input-bordered w-full max-w-xs"
          />
          {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Masukan Email"
            {...register("email", { required: true, maxLength: 20 })}
            className="input input-bordered w-full max-w-xs"
          />
          {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
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
          {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
        </label>

        <button type="submit" className="mt-10 w-full btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/login" className="capitalize underline hover:text-blue-300">
        Login
      </Link>
    </div>
  );
}
