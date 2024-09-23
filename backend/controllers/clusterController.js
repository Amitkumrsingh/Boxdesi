const Cluster = require('../models/clusterModel');
const mongoose = require('mongoose');

// Get all clusters
exports.getAllClusters = async (req, res) => {
    try {
        const clusters = await Cluster.find();
        res.status(200).json(clusters);
    } catch (error) {
        console.error("Error fetching clusters:", error);
        res.status(500).json({ message: "Failed to retrieve clusters." });
    }
};

// Get a specific cluster by ID
exports.getClusterById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    try {
        const cluster = await Cluster.findById(id);
        if (!cluster) {
            return res.status(404).json({ message: "Cluster not found." });
        }
        res.status(200).json(cluster);
    } catch (error) {
        console.error("Error fetching cluster:", error);
        res.status(500).json({ message: "Failed to retrieve cluster." });
    }
};

// Create a new cluster
exports.createCluster = async (req, res) => {
    const {
        clusterName,
        cloud,
        environment,
        region,
        accountId,
        status,
        version,
        cost,
        manage,
    } = req.body;

    if (!clusterName || !cloud || !environment || !region) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const newCluster = new Cluster({
            clusterName,
            cloud,
            environment,
            region,
            accountId,
            status,
            version,
            cost,
            manage,
        });

        console.log("Creating new cluster:", req.body);

        await newCluster.save();
        res.status(201).json(newCluster);
    } catch (error) {
        console.error("Error creating cluster:", error);
        res.status(500).json({ message: "Failed to create cluster." });
    }
};

// Delete a cluster by ID
exports.deleteCluster = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format." });
    }

    try {
        const deletedCluster = await Cluster.findByIdAndDelete(id);
        if (!deletedCluster) {
            return res.status(404).json({ message: "Cluster not found." });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        console.error("Error deleting cluster:", error);
        res.status(500).json({ message: "Failed to delete cluster." });
    }
};
