import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const Contenido = () => {

    return(
        <Box sx={{ flexGrow: 1, paddingTop: 3, marginLeft: "225px", marginTop: '8px',marginRight: 1, backgroundColor: '#121212', borderRadius: 2, height: 775 }}>
          <Box paddingX={2}>
            <Box display='flex' justifyContent="space-between">
                <Typography variant='h6'>Artistas populares</Typography>
                <Typography variant='p'>Mostrar todos</Typography>
            </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, marginTop: 3}}>
                <Card sx={{backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                    <CardMedia component='img' image='https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?resize=1000%2C600&p=1' alt='artista1' sx={{borderRadius: '50%', width: '200px', height: '200px', margin: '0 auto'}}/>
                    <CardContent>
                        <Typography variant="body1" color="white">Artista 1</Typography>
                        <Typography variant="body1" color="white">Artista</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86S_ZlKylXOd3eTqAW5KXxkngeiP-uUxtNA&s"
                            alt="Artista 2"
                            sx={{
                                borderRadius: '50%',
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 2</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://media.istockphoto.com/id/1414159406/es/vector/multicolor-abstracto-rojo-naranja-verde-p%C3%BArpura-amarillo-colorido-ondulado-papelcut.jpg?s=612x612&w=0&k=20&c=UNjQErYytEZGkh72OyyN0XvryBi_G7_NUmQGwmK34jg="
                            alt="Artista 2"
                            sx={{
                                borderRadius: '50%',
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 3</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720"
                            alt="Artista 2"
                            sx={{
                                borderRadius: '50%',
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 4</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                            alt="Artista 2"
                            sx={{
                                borderRadius: '50%',
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 5</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                            alt="Artista 2"
                            sx={{
                                borderRadius: '50%',
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent sx={{justifyContent: 'start'}}>
                            <Typography variant="body1" color="white">Artista 6</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
            </Box>
            <Typography variant='h5'>Albumes y sencillos populares</Typography>
            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2, marginTop: 3}}>
                <Card sx={{backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                    <CardMedia component='img' image='https://es.digitaltrends.com/wp-content/uploads/2023/12/google-chrome.jpeg?resize=1000%2C600&p=1' alt='artista1' sx={{borderRadius: 2, width: '200px', height: '200px', margin: '0 auto'}}/>
                    <CardContent>
                        <Typography variant="body1" color="white">Artista 1</Typography>
                        <Typography variant="body1" color="white">Artista</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86S_ZlKylXOd3eTqAW5KXxkngeiP-uUxtNA&s"
                            alt="Artista 2"
                            sx={{
                                borderRadius: 2,
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 2</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://media.istockphoto.com/id/1414159406/es/vector/multicolor-abstracto-rojo-naranja-verde-p%C3%BArpura-amarillo-colorido-ondulado-papelcut.jpg?s=612x612&w=0&k=20&c=UNjQErYytEZGkh72OyyN0XvryBi_G7_NUmQGwmK34jg="
                            alt="Artista 2"
                            sx={{
                                borderRadius: 2,
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 3</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?fit=960%2C720"
                            alt="Artista 2"
                            sx={{
                                borderRadius: 2,
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 4</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                            alt="Artista 2"
                            sx={{
                                borderRadius: 2,
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" color="white">Artista 5</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ backgroundColor: 'transparent', borderRadius: 2, padding: 2, boxShadow: 'none'}}>
                        <CardMedia
                            component="img"
                            image="https://definicion.com/wp-content/uploads/2022/09/imagen.jpg"
                            alt="Artista 2"
                            sx={{
                                borderRadius: 2,
                                width: '200px',
                                height: '200px',
                                margin: '0 auto',
                            }}
                        />
                        <CardContent sx={{justifyContent: 'start'}}>
                            <Typography variant="body1" color="white">Artista 6</Typography>
                            <Typography variant="body1" color="white">Artista</Typography>
                        </CardContent>
                    </Card>
            </Box>
          </Box>

        </Box>
    )

}

export default Contenido