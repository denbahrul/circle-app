import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User = {} as User;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return (state = {
        id: action.payload.id,
        fullName: action.payload.fullName,
        email: action.payload.email,
        password: action.payload.password,
      });
    },
    removeUser(state) {
      return (state = {} as User);
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
