import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import instance from "../services";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/schemas/loginSchema";

const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const nav = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser.email) {
      nav("/");
    }
  }, []);
  async function handleLogin(formData: any) {
    try {
      const { data } = await instance.post("/login", formData);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      nav("/");
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto w-[500px]">
      <h1 className="text-center text-2xl mt-3">Login Account</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border rounded-md p-1"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border rounded-md p-1"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <span>Don't have an account?</span>
          <span className="text-blue-500 ml-1 cursor-pointer">
            <Link to="/register">Register</Link>
          </span>
        </div>
        <button className="p-2 bg-blue-500 rounded-md mt-3">Login</button>
      </form>
    </div>
  );
};

export default LoginLayout;
