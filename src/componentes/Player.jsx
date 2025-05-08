import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useState } from "react";

const Player = () => {
    const [reproduciendo, setReproduciendo] = useState(false);
    return(
        <BottomNavigation sx={{position: 'fixed', bottom: 0, width: '100%', backgroundColor: "black", zIndex: 10 }}>
            <BottomNavigationAction icon={<SkipPreviousIcon sx={{color: "white"}}/>}/>
            <BottomNavigationAction icon={reproduciendo ? <PauseIcon sx={{color: "white"}}/> : <PlayArrowIcon sx={{color: "white"}}/>} onClick={() => setReproduciendo(!reproduciendo)}/>
            
            <BottomNavigationAction icon={<SkipNextIcon sx={{color: "white"}}/>}/> 
        </BottomNavigation>
    )
}

export default Player;