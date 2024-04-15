import storageHelper from "@/lib/storage-helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoading: boolean;
  isAuth: boolean;
  user: any;
  token: string;
};

type initialStateType = {
  value: AuthState;
};

const initialState = {
  value: {
    isLoading: true,
    isAuth: false,
    user: null,
    token: "",
  } as AuthState,
} as initialStateType;

interface LogInPayload {
  user: any;
  token: string;
}

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      storageHelper.removeItem(storageHelper.StorageKeys.Role);
      storageHelper.removeItem(storageHelper.StorageKeys.Access_Token);
      return { value: { ...initialState.value, isLoading: false } };
    },
    logIn: (state, action: PayloadAction<LogInPayload>) => {
      storageHelper.saveItem(
        storageHelper.StorageKeys.Access_Token,
        action.payload.token?.toString(),
      );
      storageHelper.saveItem(
        storageHelper.StorageKeys.Role,
        action.payload.user?.role,
      );
      if (action.payload.user) {
        return {
          value: {
            isLoading: false,
            isAuth: true,
            user: action.payload.user,
            token: action.payload.token,
          },
        };
      }
    },
    updateUser: (state, action: PayloadAction<LogInPayload>) => {
      if (action.payload.user) {
        return {
          value: {
            isLoading: false,
            isAuth: true,
            user: action.payload.user,
            token: action.payload.token,
          },
        };
      }
    },
    notFound: () => {
      return { value: { ...initialState.value, isLoading: false } };
    },
    completeProfile: (state) => {
      state.value.user = { ...state.value.user, profileVerified: true };
    },
  },
});

export const { logOut, logIn, notFound, updateUser, completeProfile } =
  auth.actions;
export default auth.reducer;
