// src/componentes/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  // Obtener sesión inicial y suscribirse a cambios
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setAvatarUrl("");
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Obtener avatar cuando cambie el usuario
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.email) return;
      try {
        const { data, error } = await supabase
          .from("usuarios")
          .select("avatar")
          .eq("email", user.email)
          .single();
        if (error) throw error;
        setAvatarUrl(data.avatar);
      } catch (error) {
        console.error("Error fetching avatar:", error.message);
      }
    };
    fetchAvatar();
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#000000" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
        {/* === Left: Home Icon === */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                borderRadius: "50%",
                padding: "8px",
                backgroundColor: "#2C2C2C",
              }}
            >
              <HomeIcon sx={{ color: "#FFFFFF", fontSize: 24 }} />
            </IconButton>
          </Link>
        </Box>

        {/* === Center: Search Bar, centered === */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            px: 2, // algo de espacio lateral
          }}
        >
          <TextField
            variant="filled"
            size="medium"
            placeholder="Buscar"
            sx={{
              backgroundColor: "#2C2C2C",
              borderRadius: "30px",
              width: "500px",
              "& .MuiFilledInput-root": {
                height: "40px",
                borderRadius: "30px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#B0B0B0", fontSize: 24 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Link to="/contenido2" style={{ textDecoration: "none" }}>
                    <IconButton>
                      <ExploreIcon sx={{ color: "#B0B0B0", fontSize: 24 }} />
                    </IconButton>
                  </Link>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* === Right: Either Avatar (if logged in) or Auth Buttons === */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                src={avatarUrl || undefined}
                alt="Avatar"
                sx={{ width: 32, height: 32 }}
              >
                {user.email.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <>
              <Link to="/registro" style={{ textDecoration: "none", color: "#aeaeae" }}>
                <Button
                  color="inherit"
                  sx={{
                    mr: 1,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  Registrarse
                </Button>
              </Link>
              <Link to="/inicioSesion" style={{ textDecoration: "none" }}>
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    px: 2,
                    borderRadius: 10,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    py: "8px",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  Iniciar sesión
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Menú desplegable tras pulsar el avatar */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            // Aquí puedes navegar a la página de perfil
          }}
        >
          Ver perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
