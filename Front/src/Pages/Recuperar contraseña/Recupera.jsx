import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CampoTexto from "../../componentes/FormPacientes/CampoTexto";
import Boton from "../../componentes/Boton";
import { nuevosDatosApi } from "../../api";

export default function Recupera(){
    let url = "";


    const [campoIncompleto, setCampoIncompleto] = useState(false);
    const [datosRecuperacion, setDatosrecuperacion] = useState({
        nuevaContra: "",
        confirmacion:""
    });
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const location = useLocation();
    
    useEffect(()=>{
        url = location.pathname;
        recuperarDatos();
    },[])
    const navigate = useNavigate();
    function cancelar(){
          navigate('/login')
}

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosrecuperacion((prevState) => ({
        ...prevState,
        [name]: value
    }));
};


async function enviarNuevosDatos(){

    if(datosRecuperacion.nuevaContra === datosRecuperacion.confirmacion){
        const formData = new FormData();
    formData.append("token", token);
    formData.append("email", email);
    formData.append("password",datosRecuperacion.confirmacion);
    const respoonse = await nuevosDatosApi(formData);
        alert(await respoonse.text());
        if(response.status == 200){
            navigate('/login');
        }
        
    }else{
        alert("Las contraseñas no coinciden.")
    }

}
    
    function recuperarDatos(){

        const datosrecuperacion = url.split("/");
         setEmail(datosrecuperacion[2]);
         setToken(datosrecuperacion[3]);
    }

    return (
        <>
         <div className="grid h-screen place-items-center">


<div className="login grid place-content-center border border-black h-1/2 p-56 bg-white rounded-xl" >
    <div className="titulo text-3xl mb-4 font-bold">
        <h2>Recuperacion de contraseña</h2>
    </div>
    <div className="formulario">
        <div className="nuevaContra">
            <CampoTexto 
                textoEtiqueta="Nueva contraseña"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "password" }}
                propsInput={{
                    type: "password",
                    name: "nuevaContra",
                    id: "inputContra1",
                    placeholder: "Nueva contraseña",
                    value: datosRecuperacion.nuevaContra,
                    onChange: handleInputChange
                }}
            />
        </div>

        <div className="confirmacion">
            <CampoTexto 
                textoEtiqueta="Confirmacion"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "password" }}
                propsInput={{
                    type: "password",
                    name: "confirmacion",
                    id: "inputconfirmacion",
                    placeholder: "Confirmacion",
                    value: datosRecuperacion.confirmacion,
                    onChange: handleInputChange
                }}
            />
        </div>
       

   
        <div className="iniciar-sesion mt-6">
        <Boton textoBoton="Cancelar" onClick={cancelar}/>
            <Boton textoBoton="Enviar" onClick={enviarNuevosDatos}/>
        </div>
    </div>
   
</div>
</div>
        </>
    )
}