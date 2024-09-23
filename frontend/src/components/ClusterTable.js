import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Modal, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination';
import { Cloud, Google, Microsoft } from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';




const ClusterTable = () => {
    const [clusters, setClusters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // For the create cluster modal
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [newCluster, setNewCluster] = useState({
        clusterName: '',
        cloud: '',
        environment: '',
        region: '',
        accountId: '',
        cost: 0,
        status: '',
        createdAt: '',
    });
    const [selectedCluster, setSelectedCluster] = useState(null);
    const handleOpenViewModal = (cluster) => {
        setSelectedCluster(cluster);
        setIsViewModalOpen(true);
    };
    const handleCloseViewModal = () => {
        setSelectedCluster(null);
        setIsViewModalOpen(false);
    };
    // Fetch clusters from API
    useEffect(() => {
        fetch('http://localhost:8000/api/clusters')
            .then(response => response.json())
            .then(data => setClusters(data))
            .catch(error => console.error('Error fetching clusters:', error));
    }, []);

    // Handle opening/closing the modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Handle input change for the modal form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCluster((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle create cluster API call
    const handleCreateCluster = () => {
        fetch('http://localhost:8000/api/clusters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCluster),
        })
            .then((response) => response.json())
            .then((data) => {
                setClusters([...clusters, data]); // Add the new cluster to the UI
                setIsModalOpen(false); // Close the modal
            })
            .catch((error) => console.error('Error creating cluster:', error));
    };

    // Handle delete cluster functionality
    // const handleDeleteCluster = (clusterId) => {
    //     fetch(`http://localhost:8000/api/clusters/${clusterId}`, {
    //         method: 'DELETE',
    //     })
    //         .then(() => {
    //             setClusters(clusters.filter((cluster) => cluster.id !== clusterId)); // Remove cluster from UI
    //         })
    //         .catch((error) => console.error('Error deleting cluster:', error));
    // };

    const handleDeleteCluster = (clusterId) => {
        console.log(`Deleting cluster with ID: ${clusterId}`);
        fetch(`http://localhost:8000/api/clusters/${clusterId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Cluster deleted successfully');
                    setClusters((prevClusters) => prevClusters.filter((cluster) => cluster._id !== clusterId));
                } else {
                    console.error('Failed to delete cluster:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting cluster:', error));
    };




    const cloudIcons = (cloud) => {
        switch (cloud) {
            case 'azure':
                return <Microsoft style={{ color: '#007FFF' }} />;  // Azure blue
            case 'gcp':
                return <Google style={{ color: '#DB4437' }} />;  // Google red
            case 'aws':
                return <Cloud style={{ color: '#FF9900' }} />;  // AWS orange
            default:
                return null;
        }
    };


    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredClusters = clusters.filter((cluster) =>
        cluster.clusterName.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = () => {
        const sortedClusters = [...clusters].sort((a, b) => {
            return sortDirection === 'asc'
                ? new Date(a.createdAt) - new Date(b.createdAt)
                : new Date(b.createdAt) - new Date(a.createdAt);
        });
        setClusters(sortedClusters);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };



    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Clusters ({clusters.length})</h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search clusters..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ marginRight: '10px', height: '40px' }} // Adjust container height
                        InputProps={{
                            sx: {
                                height: '40px', // Adjust input height
                            }
                        }}
                    />

                    <Button variant="contained" color="primary" style={{ backgroundColor: '#6a0dad', marginRight: '20px' }} onChange={handleSearch}>
                        <SearchIcon />
                    </Button>
                    <p onClick={handleSort}><SwapVertIcon /></p>
                    <p style={{ marginRight: '20px', fontSize: '20px', textAlign: 'center', paddingBottom: '2px' }}>  Sort</p>
                    <button variant="contained" color="primary" style={{ marginRight: '10px', backgroundColor: '#6a0dad', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' }} onClick={handleSort}> <RefreshIcon /> </button>

                    <Button variant="contained" color="primary" style={{ backgroundColor: '#6a0dad' }} onClick={handleOpenModal}>
                        Create Cluster
                    </Button>
                </div>
            </div>

            {/* Cluster Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Cluster Name</TableCell>
                            <TableCell>Cloud</TableCell>
                            <TableCell>Environment</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Account ID</TableCell>
                            <TableCell>Version</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Manage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clusters.map((cluster, index) => (
                            <TableRow key={cluster.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{cluster.clusterName}</TableCell>
                                <TableCell>{cloudIcons(cluster.cloud)}</TableCell>
                                <TableCell>{cluster.environment}</TableCell>
                                <TableCell style={{ color: 'pink' }}>{cluster.region}</TableCell>
                                <TableCell>{cluster.accountId}</TableCell>
                                <TableCell>{cluster.version || 'N/A'}</TableCell>
                                <TableCell>${cluster.cost.toFixed(2)}</TableCell>
                                <TableCell>{cluster.status}</TableCell>
                                <TableCell>{new Date(cluster.createdAt).toLocaleDateString()}</TableCell>

                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenViewModal(cluster)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={(_id) => {
                                        handleDeleteCluster(cluster._id);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination count={10} color="primary" style={{ marginTop: '20px' }} />




            {/* Create Cluster Modal */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div style={{ width: '400px', margin: '100px auto', background: 'white', padding: '20px', borderRadius: '8px' }}>
                    <h2>Create New Cluster</h2>
                    <TextField
                        label="Cluster Name"
                        name="clusterName"
                        value={newCluster.clusterName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cloud"
                        name="cloud"
                        value={newCluster.cloud}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Environment"
                        name="environment"
                        value={newCluster.environment}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Region"
                        name="region"
                        value={newCluster.region}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Account ID"
                        name="accountId"
                        value={newCluster.accountId}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cost"
                        name="cost"
                        type="number"
                        value={newCluster.cost}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Status"
                        name="status"
                        value={newCluster.status}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />

                    <Button variant="contained" color="primary" onClick={handleCreateCluster}>
                        Create
                    </Button>
                </div>
            </Modal>


            {/* View Cluster Modal */}
            <Modal open={isViewModalOpen} onClose={handleCloseViewModal}>
                <Box
                    sx={{
                        width: '400px',
                        margin: 'auto',
                        marginTop: '100px',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: 24,
                        outline: 'none',
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                        Cluster Details
                    </Typography>
                    {selectedCluster && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Typography variant="body1">
                                <strong>Cluster Name:</strong> {selectedCluster.clusterName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Cloud:</strong> {selectedCluster.cloud}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Environment:</strong> {selectedCluster.environment}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Region:</strong> {selectedCluster.region}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Account ID:</strong> {selectedCluster.accountId}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Cost:</strong> ${selectedCluster.cost.toFixed(2)}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Status:</strong> {selectedCluster.status}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Created At:</strong> {new Date(selectedCluster.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseViewModal}
                        sx={{ marginTop: '20px' }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>

        </div>
    );
};

export default ClusterTable;



