import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../entities/user";

const initialState: User = {} as User;

export const fetchUserLogged = createAsyncThunk("users/fetchUserLogged", async () => {
  const response = await fetch("http://localhost:3000/api/v1/users");
  return response.json();
});

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
