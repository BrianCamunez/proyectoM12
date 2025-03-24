import {Box,Drawer,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Button,Typography,Card,CardContent } from "@mui/material"
  import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
  import ArrowBackIcon from "@mui/icons-material/ArrowBack"
  
  const ContenidoExplorar = () => {
    const cardData = [
      { color: "#761212", text: "Musica 1" },
      { color: "#767612", text: "Musica 2" },
      { color: "#761276", text: "Musica 3" },
      { color: "#161246", text: "Musica 4" },
      { color: "#768912", text: "Musica 1" },
      { color: "#767689", text: "Musica 2" },
      { color: "#131970", text: "Musica 3" },
      { color: "#168901", text: "Musica 4" },
      { color: "#12a68f", text: "Musica 1" },
      { color: "#98f", text: "Musica 2" },
      { color: "#654a1a", text: "Musica 3" },
      { color: "#4c190a", text: "Musica 4" },
      { color: "#12a68f", text: "Musica 1" },
      { color: "#98f", text: "Musica 2" },
      { color: "#654a1a", text: "Musica 3" },
      { color: "#4c190a", text: "Musica 4" },
      { color: "#12a68f", text: "Musica 1" },
      { color: "#98f", text: "Musica 2" },
      { color: "#654a1a", text: "Musica 3" },
      { color: "#4c190a", text: "Musica 4" },
      { color: "#12a68f", text: "Musica 1" },
      { color: "#98f", text: "Musica 2" },
      { color: "#654a1a", text: "Musica 3" },
      { color: "#4c190a", text: "Musica 4" },
    ]
  
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#000", width: "100%", marginRight: 1 }}>
        {/* Sidebar Section */}
        <Box sx={{ width: 350, flexShrink: 0 }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 350,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 350,
                marginTop: "70px",
                backgroundColor: "#121212",
                color: "#aeaeae",
                borderRadius: "6px",
                height: "85.5vh",
                overflow: "hidden",
                marginLeft: 1,
                position: "relative",
              },
            }}
          >
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <LibraryMusicIcon sx={{ color: "#aeaeae" }} />
                </ListItemIcon>
                <ListItemText primary="Tu Biblioteca" />
                <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <ArrowBackIcon sx={{ transform: "rotate(180deg)", color: "#aeaeae" }} />
                </ListItemIcon>
              </ListItemButton>
  
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  backgroundColor: "#2C2C2C",
                  margin: 1,
                  borderRadius: "10px",
                  boxSizing: "border-box",
                  width: "auto",
                }}
              >
                <ListItemText sx={{ boxSizing: "border-box", color: "white" }}>Crear tu primera lista</ListItemText>
                <ListItemText sx={{ boxSizing: "border-box", color: "white" }}>
                  Es muy fácil, te echaremos una mano
                </ListItemText>
                <Button
                  sx={{
                    boxSizing: "border-box",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: 50,
                    marginTop: 1,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  Crear lista
                </Button>
              </ListItem>
            </List>
            <Box sx={{ marginTop: "auto", padding: 2 }}>
              <List>
                <ListItem>
                  <Button sx={{ color: "white" }}>Cambiar idioma</Button>
                </ListItem>
                <ListItem>
                  <Button sx={{ color: "white" }}>Política de cookies</Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Box>
  
        {/* Content Section */}
        <Box
          sx={{
            flexGrow: 1,
            paddingTop: 3,
            marginLeft: 2,
            marginRight: 1,
            backgroundColor: "#121212",
            borderRadius: 2,
            height: "83.2vh",
            marginTop: "70px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#2a2a2a",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#767612",
              borderRadius: "10px",
              border: "2px solid #161246",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#561234",
            },
          }}
        >
          <Box paddingX={{ md: 2 }} marginBottom={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Explorar todo</Typography>
              <Typography variant="body1">Mostrar todos</Typography>
            </Box>
  
            {/* Primera sección de tarjetas */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  sm: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 2,
                marginTop: 3,
              }}
            >
              {cardData.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                backgroundColor: card.color,
                                borderRadius: 3,
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent sx={{ width: "200px", height: "120px" }}>
                                <Typography variant="body1" color="white" fontWeight={'bold'}>
                                    {card.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
  
  export default ContenidoExplorar
  
  