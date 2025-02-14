import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { 
                    width: 450, 
                    boxSizing: 'border-box', 
                    marginTop: '70px', 
                    backgroundColor: '#121212', 
                    color: '#aeaeae', 
                    borderRadius: '6px', 
                    height: 800, 
                    overflow: 'hidden', 
                    marginLeft: 1,
                },
            }}
        >
            <List>
                <ListItem button>
                    <ListItemIcon ><LibraryMusicIcon sx={{ color: "#aeaeae" }} /></ListItemIcon>
                    <ListItemText primary='Tu Biblioteca' />
                    <ListItemIcon><AddIcon sx={{ color: "#aeaeae" }} /><ArrowBackIcon sx={{transform: 'rotate(180deg)', color:'#aeaeae'}}/></ListItemIcon>
                </ListItem>

                {/* Segundo ListItem con borde y sin ocupar el 100% del ancho */}
                <ListItem 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "flex-start", 
                        backgroundColor: '#2C2C2C', 
                        margin: 1,
                        borderRadius: "10px", // Opcional para bordes redondeados
                        boxSizing: "border-box", // Evita que el borde cause desbordamiento
                        width: "auto", // Esto asegura que el ListItem no ocupe el 100% del ancho
                    }}
                >
                    <ListItemText sx={{ boxSizing: "border-box", color: "white"}}>Crear tu primera lista</ListItemText>
                    <ListItemText sx={{ boxSizing: "border-box", color: "white"}}>Es muy fácil, te echaremos una mano</ListItemText>
                    <ListItemButton sx={{ boxSizing: "border-box", color: "black", backgroundColor: "white", borderRadius: 50, marginTop: 1 }}>Crear lista</ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar;
