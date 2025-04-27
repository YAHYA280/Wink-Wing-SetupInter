// Redux
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// types
import { UserInfo } from "@/types/types";

// axios
import axios from "axios";

interface AuthResponse {
  message: string;
  token: string;
  user?: UserInfo;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordResponse {
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
  resetPasswordSuccess: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  email: null,
  loading: false,
  msg: null,
  error: null,
  otp: null,
  resetPasswordSuccess: false,
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

interface ForgotPasswordBody {
  email: string;
}

interface ResetPasswordBody {
  email: string;
  otpCode: string;
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
  async ({ email }: ForgotPasswordBody, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        { email }
      );

      return { ...res.data, email }; // Return email along with the response
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.error || e.message || "An unexpected error occurred.";
      console.error("ForgotPassword error:", errorMessage, e);
      return rejectWithValue(errorMessage); // Pass the error message to rejectWithValue
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { email, otpCode, password }: ResetPasswordBody,
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
      console.error("Getting user info error:", errorMessage, e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
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
    resetPasswordState: (state) => {
      state.resetPasswordSuccess = false;
      state.otp = null;
      state.email = null;
      state.error = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) =>
    builder
      // Register cases
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
          state.user = action.payload.user || null;

          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", action.payload.token);
          }
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Login cases
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
          state.user = action.payload.user || null;

          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", action.payload.token);
          }
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.msg = action.payload.message;
          state.email = action.payload.email; // Store email for the next steps
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<ResetPasswordResponse>) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload.message;
        state.resetPasswordSuccess = true;
        state.otp = null; // Clear OTP after successful reset
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete account cases
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload.message;
        state.token = null;
        state.user = null;
        
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-token");
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get user info cases
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

export const { 
  logout, 
  setToken, 
  setOtp, 
  setError, 
  clearError, 
  setEmail,
  resetPasswordState
} = authSlice.actions;

export default authSlice.reducer;