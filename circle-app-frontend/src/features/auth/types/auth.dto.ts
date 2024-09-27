import { UserEntity } from "../../../entities/user";

export type LoginRequestDTO = Pick<UserEntity, "email" | "password">;

export type LoginResponseDTO = {
  status: string;
  message: string;
  token: string;
};

export type RegisterRequestDTO = Pick<UserEntity, "fullname" | "email" | "password">;

export type RegisterResponseDTO = {
  status: string;
  message: string;
  data: Omit<UserEntity, "password">;
};
