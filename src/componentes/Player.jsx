import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useState } from "react";

const Player = () => {
    const [reproduciendo, setReproduciendo] = useState(false);
    return(
        <BottomNavigation sx={{position: 'fixed', bottom: 0, width: '100%' }}>
            <BottomNavigationAction icon={<SkipPreviousIcon/>}/>
            <BottomNavigationAction icon={reproduciendo ? <PauseIcon/> : <PlayArrowIcon/>} onClick={() => setReproduciendo(!reproduciendo)}/>
            <BottomNavigationAction icon={<SkipNextIcon/>}/> 
        </BottomNavigation>
    )
}

export default Player;