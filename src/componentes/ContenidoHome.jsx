import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Link } from 'react-router-dom'

const ContenidoHome = () => {
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
            <ListItem button>
              <ListItemIcon>
                <LibraryMusicIcon sx={{ color: "#aeaeae" }} />
              </ListItemIcon>
              <ListItemText primary="Tu Biblioteca" />
              <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ArrowBackIcon sx={{ transform: "rotate(180deg)", color: "#aeaeae" }} />
              </ListItemIcon>
            </ListItem>

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
              <ListItemButton
                sx={{
                  boxSizing: "border-box",
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: 50,
                  marginTop: 1,
                }}
              >
                Crear lista
              </ListItemButton>
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
            width: "8px", // El tamaño del scroll
          },
          "&::-webkit-scrollbar-track": {
            background: "#2a2a2a", // Color de la pista del scroll
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#767612", // Color del pulgar del scroll
            borderRadius: "10px",
            border: "2px solid #161246", // Color del borde del pulgar
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#561234", // Color al pasar el ratón sobre el pulgar
          },
        }}
      >
        <Box paddingX={{ md: 2 }} marginBottom={20}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Artistas populares</Typography>
            <Typography variant="body1">Mostrar todos</Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
              marginTop: 3,
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Link href={`/playlist`} key={index} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: "none",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "#1c1c1c",
                      transition: "all 0.3s",
                    },
                    "&:hover .hover-content": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`https://definicion.com/wp-content/uploads/2022/09/imagen.jpg`}
                    alt={`Artista ${index + 1}`}
                    sx={{
                      borderRadius: "50%",
                      width: { md: "180px", lg: "200px" },
                      height: { md: "180px", lg: "200px" },
                      margin: "0 auto",
                    }}
                  />
                  <CardContent>
                    <Typography variant="body1" color="white">
                      {`Artista ${index + 1}`}
                    </Typography>
                    <Typography variant="body1" color="white">
                      Artista
                    </Typography>
                  </CardContent>

                  <Box
                    className="hover-content"
                    sx={{
                      position: "absolute",
                      bottom: { md: "100px" },
                      right: { md: "40px" },
                      padding: 2,
                      backgroundColor: "#E91E63",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      color: "black",
                      alignContent: "center",
                      alignItems: "center",
                      display: "flex",
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#ff4081",
                        color: "black",
                        scale: 1.1,
                        transition: "all 0.3s",
                      },
                    }}
                  >
                    <PlayArrowIcon fontSize="large" />
                  </Box>
                </Card>
              </Link>
            ))}
          </Box>
          <Typography variant="h5">Álbumes y sencillos populares</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
              marginTop: 3,
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://definicion.com/wp-content/uploads/2022/09/imagen.jpg`}
                  alt={`Artista ${index + 1}`}
                  sx={{
                    borderRadius: 2,
                    width: { md: "180px", lg: "200px" },
                    height: { md: "180px", lg: "200px" },
                    margin: "0 auto",
                  }}
                />
                <CardContent>
                  <Typography variant="body1" color="white">{`Artista ${index + 1}`}</Typography>
                  <Typography variant="body1" color="white">
                    Artista
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Typography variant="h5">Emisoras populares</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
              marginTop: 3,
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: "transparent",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://cdn0.uncomo.com/es/posts/5/4/2/como_conocer_los_colores_exactos_de_una_imagen_10245_600_square.jpg`}
                  alt={`Artista ${index + 1}`}
                  sx={{
                    borderRadius: 2,
                    width: { md: "180px", lg: "200px" },
                    height: { md: "180px", lg: "200px" },
                    margin: "0 auto",
                  }}
                />
                <CardContent>
                  <Typography variant="body1" color="white">
                    Varios artistas.
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

export default ContenidoHome

