import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "../../entities/user";

const initialState: UserEntity = {} as UserEntity;

export const fetchUserLogged = createAsyncThunk("users/fetchUserLogged", async () => {
  const response = await fetch("http://localhost:3000/api/v1/users");
  return response.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserEntity>) {
      return (state = {
        id: action.payload.id,
        fullname: action.payload.fullname,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role,
      });
    },
    removeUser(state) {
      return (state = {} as UserEntity);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserLogged.fulfilled, (state, action) => {
      return {
        ...state,
        test: action.payload,
      };
    });
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
