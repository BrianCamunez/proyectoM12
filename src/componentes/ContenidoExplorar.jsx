// src/componentes/ContenidoExplorar.jsx
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { supabase } from "../supabase/supabase"; // asegúrate que esté el import correcto
import { useNavigate } from "react-router-dom";


const ContenidoExplorar = () => {

  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGeneros = async () => {
      const { data, error } = await supabase.rpc("obtener_generos_enum");

      if (error) {
        console.error("Error al obtener géneros:", error);
      } else {
        setGeneros(data);
      }
    };

    fetchGeneros();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 2,
        py: 2,
        backgroundColor: "#121212",
        borderRadius: 2,
        overflowY: "auto",
        height: "100%",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2e2e2e",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#555555",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#777777",
        },
      }}
    >
      <Box mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="white">
            Explorar todo
          </Typography>
          <Typography variant="body2" color="#b3b3b3">
            Mostrar todos
          </Typography>
        </Box>
      </Box>

      <Box px={2} paddingTop={2}>
        <Grid container spacing={2}>
          {generos.map((genero, index) => (
            <Grid item xs={3} key={index}>
              <Box
                sx={{
                  backgroundColor: '#ff3f7f',
                  padding: 2,
                  height: '50px',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/genero/${encodeURIComponent(genero)}`)}
              >
                <Typography sx={{ color: 'white', fontSize: 14 }}>{genero}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ContenidoExplorar;
