// redux
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { Subscription } from "@/types/types";

// axios
import axios from "axios";

interface PaymentState {
  loading: boolean;
  error: null | string;
  subscription: null | Subscription;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  subscription: null,
};

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (
    {
      token,
      interval,
      referralCode,
    }: {
      token: string;
      interval: number;
      referralCode?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-checkout-session`,
        { interval, referralCode },
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
      console.error("CreateCheckoutSession error:", errorMessage, e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getSubscription = createAsyncThunk(
  "payment/getSubscription",
  async ({ token }: { token: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/subscription`,
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
      console.error("GetSubscription error:", errorMessage, e);
      return rejectWithValue(errorMessage);
    }
  }
);

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCheckoutSession.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCheckoutSession.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.subscription = action.payload;
    });
    builder
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubscription.fulfilled,
        (state, action: PayloadAction<Subscription>) => {
          state.loading = false;
          state.error = null;
          state.subscription = action.payload;
        }
      )
      .addCase(getSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = paymentSlice.actions;

export default paymentSlice.reducer;
