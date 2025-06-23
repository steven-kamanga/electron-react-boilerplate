import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authApi } from './query/auth';
import authReducer from './features/auth/authSlice';
import userRegistrationReducer from './features/form/formSlice';

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userRegistration'], // Only persist auth and userRegistration slices
  blacklist: [authApi.reducerPath], // Don't persist API cache
};

const rootReducer = combineReducers({
  auth: authReducer,
  userRegistration: userRegistrationReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Logger middleware for development
const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production',
  collapsed: true,
  duration: true,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(authApi.middleware);

    // Add logger in development
    if (process.env.NODE_ENV !== 'production') {
      return middleware.concat(logger);
    }

    return middleware;
  },
  devTools: process.env.NODE_ENV !== 'production' && {
    name: 'DispensePro App',
    trace: true,
    traceLimit: 25,
    // Force enable devtools
    actionCreators: {},
    actionSanitizer: (action: any) => action,
    stateSanitizer: (state: any) => state,
  },
});

export const persistor = persistStore(store);

// Add a global helper to inspect state in development (accessible via window.getReduxState())
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  (window as any).getReduxState = () => store.getState();
  (window as any).dispatchAction = (action: any) => store.dispatch(action);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
