import React, {useState} from "react";
import CampoTexto from "../../componentes/FormPacientes/CampoTexto";
import Boton from "../../componentes/Boton";
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route  } from "react-router-dom";


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
        <div className="grid h-screen place-items-center" style={{ backgroundImage: 'url("src/Assets/Images/Main/actividades-bg.jpg")' }}>


    <div className="login grid place-content-center border border-black h-1/2 p-56 bg-white rounded-xl" >
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
                        placeholder: "Correo electronico"
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
                        placeholder: "Contraseña"
                    }}
                />
                <Link className="underline" to={"/recuperarContra"}>¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="iniciar-sesion mt-6">
                <Boton textoBoton="Iniciar sesion" onClick={iniciarSesion}/>
            </div>
        </div>
       
    </div>
</div>
    );
}