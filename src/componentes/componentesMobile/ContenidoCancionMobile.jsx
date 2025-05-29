import { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LinearProgress } from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import IosShareIcon from "@mui/icons-material/IosShare";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PauseIcon from "@mui/icons-material/Pause";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { supabase } from "../../supabase/supabase";

const ContenidoCancionMobile = () => {
  const navigate = useNavigate();

  const {
    cancionActual,
    reproduciendo,
    pausar,
    reanudar,
    audioRef,
    reproducirCancion,
  } = usePlayer();

  const [artistaInfo, setArtistaInfo] = useState(null);
  const [cancionesRelacionadas, setCancionesRelacionadas] = useState([]);

  const [progreso, setProgreso] = useState(0);
  const [duracion, setDuracion] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const actualizarProgreso = () => {
      setProgreso(audio.currentTime);
      setDuracion(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", actualizarProgreso);
    return () => {
      audio.removeEventListener("timeupdate", actualizarProgreso);
    };
  }, [audioRef]);

  if (!cancionActual) {
    return navigate("/");
  }

  const handleBackClick = () => {
    navigate(-1); 
  };

  const formatSeconds = (s) => {
    if (!s) return "0:00";
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  useEffect(() => {
    const cargarInfo = async () => {
      if (!cancionActual?.artista) return;

      // Obtener artista
      const { data: artista } = await supabase
        .from("usuarios")
        .select("*")
        .eq("nombre", cancionActual.artista)
        .single();

      setArtistaInfo(artista);

      if (!artista?.id) return;

      let query = supabase
        .from("canciones")
        .select("*")
        .eq("artista", artista.id)
        .limit(3);

      if (cancionActual.id) {
        query = query.neq("id", cancionActual.id);
      }

      const { data: relacionadas } = await query;
      setCancionesRelacionadas(relacionadas);
    };

    cargarInfo();
  }, [cancionActual]);

  return (
    <>
      <Box marginX={2}>
        <Box display={"flex"} justifyContent={"space-between"} paddingTop={2}>
          <KeyboardArrowDownIcon onClick={handleBackClick} />
          <Box>Reproduciendo canciones recomendadas</Box>
          <MoreHorizIcon />
        </Box>
        <Box
          height={"70vh"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            src={cancionActual.imagen}
            width={"50vh"}
            height={"50vh"}
            sx={{ objectFit: "cover", borderRadius: 2 }}
          />
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Box
                component="img"
                src={cancionActual.imagen}
                width={"40px"}
                height={"40px"}
                borderRadius={2}
              />
              <Box paddingLeft={1}>
                <Box>{cancionActual.nombre}</Box>
                <Box>{cancionActual.artista}</Box>
              </Box>
            </Box>
            <Box>
              <RemoveCircleOutlineIcon />
              <AddCircleOutlineIcon sx={{ paddingLeft: 1 }} />
            </Box>
          </Box>
          <Box pt={1}>
            <LinearProgress
              variant="determinate"
              value={(progreso / duracion) * 100 || 0}
              sx={{
                height: 6,
                borderRadius: 5,
                backgroundColor: "#2a2a2a",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#ff4081",
                },
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              fontSize={12}
              color="#b3b3b3"
            >
              <Box>{formatSeconds(progreso)}</Box>
              <Box>{formatSeconds(duracion)}</Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            pt={2}
            sx={{ fontSize: "35px" }}
          >
            <ShuffleIcon fontSize="" />
            <SkipPreviousIcon fontSize="" />
            <IconButton onClick={reproduciendo ? pausar : reanudar}>
              {reproduciendo ? (
                <PauseIcon sx={{ fontSize: 40, color: "white" }} />
              ) : (
                <PlayCircleFilledIcon sx={{ fontSize: 40, color: "white" }} />
              )}
            </IconButton>

            <SkipNextIcon fontSize="" />
            <RepeatIcon fontSize="" />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} pt={1}>
            <Box display={"flex"}>
              <HeadphonesIcon sx={{ paddingRight: 1 }} />
              <Box alignContent={"center"}>JBL Live 770NC</Box>
            </Box>
            <Box alignContent={"center"} display={"flex"}>
              <IosShareIcon />
              <ViewStreamIcon sx={{ paddingTop: "3px", paddingLeft: 1 }} />
            </Box>
          </Box>
        </Box>
        <Box
          mt={3}
          px={2}
          py={3}
          sx={{
            backgroundColor: "#1a1a1a",
            borderRadius: 3,
          }}
        >
          <Box fontWeight="bold" fontSize="18px" mb={2}>
            Descubre más de {cancionActual.artista}
          </Box>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              paddingBottom: 1,
              justifyContent: "center",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {cancionesRelacionadas.map((rel) => (
              <Box
                key={rel.id}
                onClick={() =>
                  reproducirCancion({
                    id: rel.id,
                    nombre: rel.nombre,
                    artista: cancionActual.artista,
                    imagen: rel.imagen,
                    url: rel.cancion,
                  })
                }
                sx={{
                  flexShrink: 0,
                  width: 140,
                  height: 200,
                  borderRadius: 2,
                  position: "relative",
                  backgroundImage: `url(${rel.imagen})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  color: "white",
                  padding: 1,
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {rel.nombre.length > 20
                    ? `Similar a ${cancionActual.artista}`
                    : rel.nombre}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box mt={2} borderRadius={3} sx={{ backgroundColor: "#121212" }}>
          <Box
            mt={2}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#121212",
            }}
          >
            <Box
              component="img"
              src={cancionActual.imagen}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box px={2} py={2} sx={{ backgroundColor: "#121212" }}>
              <Box fontWeight="bold" fontSize="14px" mb={1} color="white">
                Información del artista
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Box fontWeight="bold" fontSize="18px" color="white">
                    {artistaInfo?.nombre || cancionActual.artista}
                  </Box>
                  <Box fontSize="14px" color="#b3b3b3">
                    {artistaInfo?.oyentes || "0"} oyentes mensuales
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                    borderRadius: "20px",
                    fontSize: "13px",
                    px: 2,
                  }}
                >
                  Seguir
                </Button>
              </Box>

              <Box mt={2} fontSize="14px" color="#b3b3b3">
                {artistaInfo?.descripcion || "Sin descripción."}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my={3} sx={{ backgroundColor: "#121212" }} borderRadius={2} p={2}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>Créditos</Box>
            <Box>Ver todos</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} pt={2}>
            <Box py={1}>
              <Box>Bring Me The Horizon</Box>
              <Box>Artista principal, Composición, Letrista</Box>
            </Box>
            <Button>Seguir</Button>
          </Box>
          <Box py={1}>
            <Box>Zakk Cervini</Box>
            <Box>Productor</Box>
          </Box>
          <Box py={1}>
            <Box>Evil Twin</Box>
            <Box>Productor</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContenidoCancionMobile;
