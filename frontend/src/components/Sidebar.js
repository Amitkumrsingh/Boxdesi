// // components/Sidebar.js
// import React from 'react';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import CloudIcon from '@mui/icons-material/Cloud';
// import AnchorIcon from '@mui/icons-material/Anchor';
// import SettingsIcon from '@mui/icons-material/Settings';
// import PeopleIcon from '@mui/icons-material/People';

// const Sidebar = () => {
//     const sidebarItems = [
//         { icon: <CloudIcon />, text: 'Cloud' },
//         { icon: <AnchorIcon />, text: 'Anchor' },
//         { icon: <SettingsIcon />, text: 'Settings' },
//         { icon: <PeopleIcon />, text: 'Users' },
//     ];

//     return (
//         <div className="sidebar">
//             <List>
//                 {sidebarItems.map((item, index) => (
//                     <ListItem button key={index}>
//                         <ListItemIcon>{item.icon}</ListItemIcon>
//                         <ListItemText primary={item.text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default Sidebar;


import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CloudIcon from '@mui/icons-material/Cloud';
import AnchorIcon from '@mui/icons-material/Anchor';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { Home } from '@mui/icons-material';


const Sidebar = () => {
    const sidebarItems = [

        { icon: <Home />, text: 'Dashboard', route: '/' }, // Home as Dashboard
        { icon: <AnchorIcon />, text: 'Clusters', route: '/cluster-table' }, // Clusters route
        { icon: <SettingsIcon />, text: 'Settings', route: '/settings' },
        { icon: <PeopleIcon />, text: 'Users', route: '/users' },
        { icon: <CloudIcon />, text: 'Cloud', route: '/cloud' }

    ];

    return (
        <div className="sidebar">
            <List>
                {sidebarItems.map((item, index) => (
                    <ListItem button key={index} component={Link} to={item.route}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;

