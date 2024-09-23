// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import clusterReducer from '../features/clusterSlice';

const store = configureStore({
    reducer: {
        clusters: clusterReducer,
    },
});

export default store;
