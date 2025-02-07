import { Drawer, List, ListItem, ListItemIcon,ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const Sidebar = () => {
    return(
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', marginTop: '70px', backgroundColor: '#2C2C2C', color: '#aeaeae' },
            }}
        >
            <List>
                <ListItem button>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary='Inicio'/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LibraryMusicIcon/></ListItemIcon>
                    <ListItemText primary='Tu Biblioteca'/>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar;