import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    clusters: [],
    status: 'idle',
    error: null,
};

// Async thunk to add a cluster (POST)
export const addCluster = createAsyncThunk('clusters/addCluster', async (newCluster) => {
    const response = await axios.post('http://localhost:8000/api/clusters', newCluster);
    return response.data;
});

// Async thunk to fetch clusters (GET)
export const fetchClusters = createAsyncThunk('clusters/fetchClusters', async () => {
    const response = await axios.get('http://localhost:8000/api/clusters');
    return response.data;
});

// Async thunk to delete a cluster (DELETE)
export const deleteCluster = createAsyncThunk('clusters/deleteCluster', async (clusterId) => {
    await axios.delete(`http://localhost:8000/api/clusters/${clusterId}`);
    return clusterId; // Return the ID for easier removal from state
});

const clusterSlice = createSlice({
    name: 'clusters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClusters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClusters.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clusters = action.payload.slice(0, 5); // Simulate 5 cluster entries
            })
            .addCase(fetchClusters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addCluster.fulfilled, (state, action) => {
                state.clusters.push(action.payload);
            })
            .addCase(deleteCluster.fulfilled, (state, action) => {
                // Remove the cluster with the matching ID
                state.clusters = state.clusters.filter(cluster => cluster.id !== action.payload);
            });
    },
});

export default clusterSlice.reducer;
