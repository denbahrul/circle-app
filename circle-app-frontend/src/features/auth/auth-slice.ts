import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User = {} as User;

export const fetchUserLogged = createAsyncThunk("users/fetchUserLogged", async () => {
  const response = await fetch("https://63660b33046eddf1baf77f68.mockapi.io/api/v1/user");
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
