import { authApi } from '@reducers/blogApi'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseUrl } from '@utils/const'
import { Token, TokenHandler } from '@utils/tokenHandler'
import { User } from 'types/user'

type AuthState = {
  initialized: boolean
  tokens?: Token
  user?: User
}

const tokenHandler = new TokenHandler()
const initialState: AuthState = {
  initialized: false,
}

const fetchNewIdToken = async (refreshToken: string) => {
  const response = await fetch(`${baseUrl}/regenerateToken`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
  if (!response.ok) {
    throw new Error('refresh session failed')
  }
  return (await response.json()) as { id_token: string; access_token: string }
}

export const initialize = createAsyncThunk<{ token: Token } | undefined>('authn/initialize', async () => {
  const token = tokenHandler.getToken()
  if (!token) {
    return undefined
  }
  // 初期ロード時に常に新しいトークンを取得する
  try {
    const { id_token, access_token } = await fetchNewIdToken(token.refreshToken)
    return {
      token: { ...token, idToken: id_token, accessToken: access_token },
    }
  } catch (err) {
    console.error(err)
  }
})

export const regenerateIdToken = createAsyncThunk('auth/regenerateIdToken', async () => {
  const token = tokenHandler.getToken()
  if (!token) {
    throw new Error('no token')
  }
  const { id_token, access_token } = await fetchNewIdToken(token.refreshToken)
  return { ...token, idToken: id_token, accessToken: access_token }
})

const authSlice = createSlice({
  name: 'authn',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialize.fulfilled, (state, action) => {
      state.initialized = true
      state.tokens = action.payload?.token
    })
    builder.addCase(initialize.rejected, (state) => {
      state.initialized = true
    })
    builder.addCase(regenerateIdToken.fulfilled, (state, action) => {
      state.tokens = action.payload
    })
    builder.addCase(regenerateIdToken.rejected, (state) => {
      state.tokens = undefined
      tokenHandler.clearToken()
    })
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
      if ('id_token' in action.payload) {
        state.tokens = {
          idToken: action.payload.id_token ?? '',
          accessToken: action.payload.access_token ?? '',
          refreshToken: action.payload.refresh_token ?? '',
        }
        tokenHandler.storeToken({
          idToken: action.payload.id_token ?? '',
          refreshToken: action.payload.refresh_token ?? '',
          accessToken: action.payload.access_token ?? '',
        })
      }
    })
    // builder.addMatcher(usersApi.endpoints.signOut.matchFulfilled, (state) => {
    //   state.tokens = undefined;
    //   state.user = undefined;
    //   tokenHandler.clearToken();
    // });
    // note: intentionally sign out
    // builder.addMatcher(usersApi.endpoints.signOut.matchRejected, (state) => {
    //   state.tokens = undefined;
    //   state.user = undefined;
    //   tokenHandler.clearToken();
    // });
  },
})

export const { setUser } = authSlice.actions
export const AuthReducer = authSlice.reducer
