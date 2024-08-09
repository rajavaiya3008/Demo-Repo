import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { todoSlice } from "../slices/todo";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todo'], // Only persist the 'form' slice of state
  };

const rootReducer = combineReducers({
    todo:todoSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore specific action types or paths
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          ignoredPaths: ['register'],
        },
      }).concat(
        createStateSyncMiddleware({
          blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
        })
      ),
  });

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//         },
//       }).concat(
//         createStateSyncMiddleware({
//           blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
//         }),
//         store => next => action => {
//           console.log('Dispatching action:', action);
//           return next(action);
//         }
//       ),
//   });
  
  initMessageListener(store);
  
  export const persistor = persistStore(store);
  export default store;