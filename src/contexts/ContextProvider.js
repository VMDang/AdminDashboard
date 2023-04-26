import React, { createContext, useContext, useState } from "react";

const StateContext = createContext(null);

const initialState =  {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ( {children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const handleCLick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true});
    }

    return (
        <StateContext.Provider
            value={{ activeMenu, setActiveMenu,
                    isClicked, setIsClicked, handleCLick,
                    screenSize, setScreenSize }}
        >
            { children }
        </StateContext.Provider>
    );

}

export const useStateContext = () => useContext(StateContext);