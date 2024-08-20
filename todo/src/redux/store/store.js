import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { todoSlice } from "../slices/todo";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todo'], // Only persist the 'todo' slice of state
  };

// const rootReducer = combineReducers({
//     todo:todoSlice.reducer
// })

const appReducer = combineReducers({
  todo: todoSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // Return undefined to trigger reinitialization of the state
    state = undefined;
  }
  return appReducer(state, action);
};

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