import React, { createContext, useState, useContext} from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [state, setState] = useState("Soy el contexto")

    return(
        <MyContext></MyContext>
    )

}