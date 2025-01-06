import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import instance from "../services";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemas/registerSchema";

const RegisterLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });
  const nav = useNavigate();
  async function handleRegister(data: any) {
    try {
      await instance.post("/register", data);
      confirm("Login?") && nav("/login");
      reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto w-[500px]">
      <h1 className="text-center text-2xl mt-3">Register Account</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="border rounded-md p-1"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role">Role</label>
          <select className="border rounded-md p-1" {...register("role")}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && (
            <span className="text-red-500">{errors.role.message}</span>
          )}
        </div>
        <div>
          <button className="p-2 bg-blue-500 rounded-md mt-3">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterLayout;
