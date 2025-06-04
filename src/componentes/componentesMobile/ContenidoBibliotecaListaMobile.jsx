import { Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Link } from "react-router-dom";

const ContenidoBibliotecaListaMobile = ({ playlists }) => {
  return (
    <>
      {playlists.map((playlist) => (
        <Link
          to={`/playlistMobile/${playlist.id}`}
          style={{ textDecoration: "none", color: "white" }}
          key={playlist.id}
        >
          <Box display="flex" paddingY={1}>
            <Box
              component="img"
              src={playlist.imagen}
              width="100px"
              height="100px"
              sx={{ borderRadius: 2 }}
            />
            <Box
              justifyContent="center"
              display="flex"
              flexDirection="column"
              paddingLeft={1}
            >
              <Box fontWeight="bold">{playlist.nombre}</Box>
              <Box display="flex" alignItems="center" gap={1} fontSize="14px" color="#b3b3b3">
                <ArrowCircleDownIcon sx={{ fontSize: 16 }} />
                Lista · {playlist.usuarios?.nombre || "Desconocido"}
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </>
  );
};

export default ContenidoBibliotecaListaMobile;
