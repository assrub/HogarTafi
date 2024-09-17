import React, {useState} from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Boton from "./Boton";
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [campoIncompleto, setCampoIncompleto] = useState(false);
    const navigate = useNavigate();
    function iniciarSesion(){
        const email = document.getElementById("inputEmail").value;
    const contraseña = document.getElementById("inputContraseña").value;
    
        if (email === "" || contraseña === ""){
            setCampoIncompleto(true);
            return;
          } else {
            setCampoIncompleto(false);
          }

          navigate('/userPanel')

}

    return(
<div className="grid h-screen place-items-center">
    <div className="login grid place-content-center border border-black h-1/2 py-10 px-32">
        <div className="titulo text-3xl mb-4 font-bold">
            <h2>Inicio de sesion</h2>
        </div>
        <div className="formulario">
            <div className="email">
                <CampoTexto 
                    textoEtiqueta="Correo electronico"
                    error={campoIncompleto}
                    obligatorio={true}
                    propsLabel={{ labelFor: "email" }}
                    propsInput={{
                        type: "text",
                        name: "email",
                        id: "inputEmail",
                        placeHolder: "Correo electronico"
                    }}
                />
            </div>
            <div className="contra">
                <CampoTexto 
                    textoEtiqueta="Contraseña"
                    error={campoIncompleto}
                    obligatorio={true}
                    propsLabel={{ labelFor: "password" }}
                    propsInput={{
                        type: "password",
                        name: "contraseña",
                        id: "inputContraseña",
                        placeHolder: "Contraseña"
                    }}
                />
                <a href="" className="underline">¿Olvidaste la contraseña?</a>
            </div>
            <div className="iniciar-sesion mt-6">
                <Boton textoBoton="Iniciar sesion" onClick={iniciarSesion}/>
            </div>
        </div>
    </div>
</div>
    );
}