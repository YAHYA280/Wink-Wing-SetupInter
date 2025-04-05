// Reduxx
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// types
import { UserInfo } from "@/types/types";

// axios
import axios from "axios";

interface AuthResponse {
  message: string;
  token: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  email: string | null;
  loading: boolean;
  msg: string | null;
  error: string | null;
  otp: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  email: null,
  loading: false,
  msg: null,
  error: null,
  otp: null,
};

interface RegisterBody {
  email: string;
  password: string;
  country: string;
  name: string;
  type: string;
  cityId: number;
  maxTravelTime: number;
  transportType: string;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minFloorArea: number;
  furnished: boolean | null;
  neighbourhoods: any[];
  also_search_for: string[];
  nice_to_have: string[];
  show_only_properties_for: string[];
  userType: string;
  address: string;
  point: number[];
  radius: number;
  geometry: any;
}

interface LoginBody {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      country,
      name,
      type,
      cityId,
      maxTravelTime,
      transportType,
      minPrice,
      maxPrice,
      minBeds,
      minFloorArea,
      furnished,
      neighbourhoods,
      nice_to_have,
      also_search_for,
      show_only_properties_for,
      userType,
      address,
      point,
      radius,
      geometry,
    }: RegisterBody,
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          email,
          password,
          country,
          name,
          type,
          cityId,
          maxTravelTime,
          transportType,
          minPrice,
          maxPrice,
          minBeds,
          minFloorArea,
          furnished,
          neighbourhoods,
          nice_to_have,
          also_search_for,
          show_only_properties_for,
          userType,
          address,
          point,
          radius,
          geometry,
        }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("Registration error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginBody, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("Login error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        { email }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || "An unexpected error occurred.";
      console.error("ForgotPassword error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (
    {
      email,
      otpCode,
      password,
    }: {
      email: string;
      otpCode: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          email,
          otpCode,
          password,
        }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("ResetPassword error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/delete",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("Deleting account error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("Deleting account error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.msg = action.payload.message;
          state.token = action.payload.token;

          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", action.payload.token);
          }
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.msg = action.payload.message;
          state.token = action.payload.token;

          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", action.payload.token);
          }
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.msg = action.payload.message;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload.message;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }),
});

export const { logout, setToken, setOtp, setError, clearError, setEmail } =
  authSlice.actions;

export default authSlice.reducer;
