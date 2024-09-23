// src/pages/Dashboard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

const Dashboard = () => {
    // Sample data for traces tracked chart
    const traceData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Traces',
                data: [40, 30, 20, 50, 30, 40, 30],
                fill: false,
                borderColor: '#36a2eb',
            },
        ],
    };

    // Sample data for model usage chart
    const modelUsageData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'eaze_ai',
                data: [10, 30, 50, 20, 10, 15, 20],
                fill: false,
                borderColor: '#36a2eb',
            },
            {
                label: 'meta',
                data: [10, 20, 40, 30, 60, 50, 40],
                fill: false,
                borderColor: '#ff6384',
            },
            {
                label: 'Gemini',
                data: [5, 15, 20, 35, 40, 35, 40],
                fill: false,
                borderColor: '#ff9f40',
            },
        ],
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Traces</h2>
                <div className="trace-summary">
                    <p>30 Total traces tracked</p>
                    <div className="trace-item">
                        <span>xhdjw88wjw</span>
                        <span className="trace-bar" style={{ width: '80%' }}></span>
                        <span>19</span>
                    </div>
                    <div className="trace-item">
                        <span>eaze-ai</span>
                        <span className="trace-bar" style={{ width: '30%' }}></span>
                        <span>6</span>
                    </div>
                    {/* Add more traces as required */}
                </div>
            </div>

            <div className="dashboard-body">
                <div className="chart-container">
                    <h3>Traces</h3>
                    <Line data={traceData} />
                </div>
                <div className="chart-container">
                    <h3>Model Usage</h3>
                    <Line data={modelUsageData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
