import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../hooks/use-store";
import { apiV1 } from "../../../libs/api";
import { getUserLogged } from "../auth-slice";
import { RegisterFormInput, registerSchema } from "../schemas/register";
import { RegisterRequestDTO, RegisterResponseDTO } from "../types/auth.dto";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmit(data: RegisterFormInput) {
    try {
      const response = await apiV1.post<null, { data: RegisterResponseDTO }, RegisterRequestDTO>("/auth/register", { fullname: data.fullname, email: data.email, password: data.password });
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });
      const { accessToken } = response.data.data;

      Cookies.set("token", accessToken, { expires: 2 });

      dispatch(getUserLogged());

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: `${error.response.data.message}`,
          background: "#1D1D1D",
          color: "#fff",
        });
      } else {
        console.error("Unexpected error", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred",
          background: "#1D1D1D",
          color: "#fff",
        });
      }
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
