import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { supabase } from "../../supabase/supabase";

const NavbarMobile = () => {
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) throw userError;

                const { data, error } = await supabase
                    .from("usuarios")
                    .select("avatar")
                    .eq("email", user.email) // Comparar por correo en lugar de ID
                    .single();

                if (error) throw error;

                setAvatarUrl(data.avatar);
            } catch (error) {
                console.error("Error fetching avatar:", error.message);
            }
        };

        fetchAvatar();
    }, []);

    return (
        <>
            <Box display={"flex"} gap={1} margin={1} mt={2} justifyContent={"left"} alignContent={"center"} py={1}>
                <Box
                    component="img"
                    src={avatarUrl}
                    alt="Imagen Perfil"
                    sx={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                
                <Button sx={{ backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2 }}>
                    Todos
                </Button>
                <Button sx={{ backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2 }}>
                    Música
                </Button>
                <Button sx={{ backgroundColor: "#3a3a3a", borderRadius: 30, textTransform: "none", color: "white", paddingX: 2 }}>
                    Pódcasts
                </Button>
            </Box>
        </>
    );
};

export default NavbarMobile;