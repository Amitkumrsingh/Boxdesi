const express = require('express');
const router = express.Router();
const {
    getAllClusters,
    createCluster,
    getClusterById,
    deleteCluster,
} = require('../controllers/clusterController');

// Routes
router.get('/', getAllClusters);
router.post('/', createCluster);
router.get('/:id', getClusterById); // Route to get a specific cluster by ID
router.delete('/:id', deleteCluster); // Route to delete a cluster by ID

module.exports = router;
