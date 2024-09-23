// import React from 'react';
// import Sidebar from './components/Sidebar';
// import ClusterTable from './components/ClusterTable';
// import './styles.css'; // Assuming styles are defined in styles.css
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Dashboard from './pages/Dashboard';

// function App() {
//     return (
//         <div style={{ display: 'flex' }}>
//             <Sidebar />
//             <div style={{ flex: 1 }}>
//                 <ClusterTable />
//                 {/* <Dashboard /> */}
//             </div>
//         </div>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ClusterTable from './components/ClusterTable';
import Dashboard from './pages/Dashboard';
import './styles.css'; // Assuming styles are defined in styles.css

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Routes>
                        {/* Define route for ClusterTable */}
                        <Route path="/cluster-table" element={<ClusterTable />} />

                        {/* Define route for Dashboard */}
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

