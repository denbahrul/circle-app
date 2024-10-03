import { UserEntity } from "../../../entities/user";

export interface UserProfileDTO {
  id: number;
  fullname: string;
  username?: string;
  bio?: string;
  profilePhoto?: string;
  following: number;
  followers: number;
}

export type EditProfileRequestDTO = Pick<UserEntity, "fullname" | "username" | "bio" | "profilePhoto">;

export type EditProfileResponseDTO = {
  status: string;
  message: string;
};

export type UserStoreDTO = Omit<UserEntity, "password">;