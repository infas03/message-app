import rootReducer from './index';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'message-app',
  storage: storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStoreAndPersist = () => {
  let store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_ENVIRONMENT !== 'PROD',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStoreAndPersist;
