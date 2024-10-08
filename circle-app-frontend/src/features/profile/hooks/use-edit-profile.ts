import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { apiV1 } from "../../../libs/api";
import { getUserLogged } from "../../auth/auth-slice";
import { EditProfileFormInput, editProfileSchema } from "../schema/edit";
import { EditProfileResponseDTO } from "../types/profile.dto";

export default function useEditProfile() {
  const user = useAppSelector((state) => state.auth.entities);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      profilePhoto: user.profilePhoto,
      fullname: user.fullname,
      username: user.username,
      bio: user.bio,
    },
  });

  async function onSubmit(data: EditProfileFormInput) {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("bio", data.bio);
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      const response = await apiV1.patch<null, { data: EditProfileResponseDTO }>("/users", formData);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        background: "#1D1D1D",
        color: "#fff",
        iconColor: "#04A51E",
        timer: 1000,
      });

      dispatch(getUserLogged());

      // const updateData = response.data.data;

      // dispatch(
      //   updateProfile({
      //     profilePhoto: updateData.profilePhoto,
      //     fullname: updateData.fullname,
      //     username: updateData.username,
      //     bio: updateData.bio,
      //   })
      // );
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
    } finally {
    }
  }

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    onSubmit,
  };
}
