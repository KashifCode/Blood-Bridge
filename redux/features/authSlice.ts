import storageHelper from '@/lib/storage-helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isLoading: boolean;
    isAuth: boolean;
    data: any;
};

type initialStateType = {
    value: AuthState,
};

const initialState = {
    value: {
        isLoading: true,
        isAuth: false,
        data: null,
    } as AuthState,
} as initialStateType;

interface LogInPayload {
    data: any;
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            storageHelper.removeItem(storageHelper.StorageKeys.Role);
            storageHelper.removeItem(storageHelper.StorageKeys.Access_Token);
            return { value: { ...initialState.value, isLoading: false } }
        },
        logIn: (state, action: PayloadAction<LogInPayload>) => {
            storageHelper.saveItem(
                storageHelper.StorageKeys.Access_Token,
                action.payload.data.token?.toString(),
            );
            storageHelper.saveItem(storageHelper.StorageKeys.Role, action.payload.data.user?.role);
            if (action.payload.data.user) {
                return {
                    value: {
                        isLoading: false,
                        isAuth: true,
                        data: action.payload.data,
                    },
                }
            }
        },
        updateUser: (state, action: PayloadAction<LogInPayload>) => {
            if (action.payload.data.user) {
                return {
                    value: {
                        isLoading: false,
                        isAuth: true,
                        data: action.payload.data,
                    },
                }
            }
        },
        notFound: () => {
            return { value: { ...initialState.value, isLoading: false } }
        },
        completeProfile: (state) => {
            state.value.data.user = { ...state.value.data.user, profileVerified: true };
        }
    },
});

export const { logOut, logIn, notFound, updateUser, completeProfile } = auth.actions;
export default auth.reducer;