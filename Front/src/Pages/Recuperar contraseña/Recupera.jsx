import React, {useEffect} from "react";
import { useLocation } from 'react-router-dom';

export default function Recupera(){

    const location = useLocation();
    let url = "";
    useEffect(()=>{
        url = location.pathname;
    },[])
    function recuperarDatos(){
        console.log(url);
    }

    return (
        <>
        <button onClick={recuperarDatos}>AAAAAAAAAAAAAAA</button>
        </>
    )
}