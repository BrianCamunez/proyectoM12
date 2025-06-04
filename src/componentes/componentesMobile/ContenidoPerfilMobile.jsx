import { useEffect, useState } from 'react';
import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabase';
import { Link } from "react-router-dom";

const ContenidoPerfilMobile = () => {
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const validarSesion = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/registro");
      }
    };
    validarSesion();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmailUsuario(user.email);

      // Obtener usuario desde tabla usuarios
      const { data: usuario, error: usuarioError } = await supabase
        .from("usuarios")
        .select("id, nombre, avatar")
        .eq("email", user.email)
        .single();

      if (usuarioError) {
        console.error("Error obteniendo usuario:", usuarioError);
        return;
      }

      setUserName(usuario.nombre);
      setAvatarUrl(usuario.avatar);

      // Obtener playlists del usuario
      const { data: playlistsData, error: playlistsError } = await supabase
        .from("playlist")
        .select("id, nombre, imagen, usuarios ( email )")
        .eq("usuarios.email", user.email)
        .limit(5);

      if (!playlistsError) {
        setPlaylists(playlistsData);
      } else {
        console.error("Error obteniendo playlists:", playlistsError);
      }
    };

    getUserData();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const mirarImagenClick = () => {
    document.getElementById("imagenInput").click();
  };

  const mirarCambiarImagen = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert("Por favor selecciona una imagen válida");
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar.${fileExt}`;
      const filePath = `${userName}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('users')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('users')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ avatar: publicUrl })
        .eq('email', emailUsuario);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      console.log("Imagen actualizada correctamente");
    } catch (error) {
      console.error("Error al subir la imagen:", error.message);
      alert("Hubo un problema al subir la imagen");
    }
  };

  return (
    <Box mx={2} rowGap={4} flexDirection={"column"} display={"flex"} mt={2}>
      <Box>
        <KeyboardArrowDownIcon onClick={handleBackClick} sx={{ rotate: "90deg", fontSize: "50px" }} />
      </Box>

      <Box display={"flex"} alignItems="center" gap={3}>
        <Box position="relative">
          <Box
            component="img"
            src={avatarUrl}
            width={"150px"}
            height={"150px"}
            borderRadius={"50%"}
            onClick={mirarImagenClick}
            sx={{ cursor: "pointer" }}
          />
          <input type="file" id="imagenInput" hidden accept="image/*" onChange={mirarCambiarImagen} />
        </Box>
        <Box>
          <Box fontWeight="bold" fontSize="20px">{userName}</Box>
          <Box color="#ccc">0 seguidores · 4 siguiendo</Box>
        </Box>
      </Box>

      <Box display={"flex"} gap={2} alignItems={"center"}>
        <Button sx={{ color: "white", border: "2px white solid", borderRadius: "30px", px: 2 }}>
          Editar
        </Button>
        <IosShareIcon sx={{ color: "#cdcdcd", fontSize: "30px" }} />
        <MoreHorizIcon sx={{ color: "#cdcdcd", fontSize: "30px" }} />
        <Button onClick={handleLogout} sx={{ color: "white", border: "1px white solid", borderRadius: "30px", px: 2 }}>
          Cerrar sesión
        </Button>
      </Box>

      <Box display={"flex"} gap={2} flexDirection={"column"} mt={2}>
        <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>Listas</Box>

        {playlists.map((playlist) => (
          <Box key={playlist.id} display={"flex"} gap={2} alignItems={"center"}>
            <Box component="img" src={playlist.imagen} width={"50px"} height={"50px"} borderRadius={1} />
            <Box>
              <Box>{playlist.nombre}</Box>
              <Box sx={{ color: "#cdcdcd" }}>Guardada 0 veces · {userName}</Box>
            </Box>
          </Box>
        ))}

        <Box justifyContent="center" display="flex" alignItems="center" mt={2}>
          <Link to="/biblioteca">
          <Button sx={{ color: "white", border: "1px #cdcdcd solid", borderRadius: "30px", px: 3 }}>
            Ver todas las listas
          </Button></Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ContenidoPerfilMobile;
