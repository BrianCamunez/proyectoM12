import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Player from "./Player";

const LayoutConNavbarYPlayer = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          pt: "64px",
          height: "calc(100vh - 64px - 64px)", // Ajusta si el player tiene altura distinta
          overflow: "hidden",
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
      <Player />
    </>
  );
};

export default LayoutConNavbarYPlayer;
