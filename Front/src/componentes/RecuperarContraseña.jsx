import React, {useState} from "react";
import CampoTexto from "./FormPacientes/CampoTexto";
import Boton from "./Boton";
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route  } from "react-router-dom";


export default function RecuperarContraseña(){

    const [campoIncompleto, setCampoIncompleto] = useState(false);
    const navigate = useNavigate();
    function cancelar(){
          navigate('/login')
}

    return (
        <div className="grid h-screen place-items-center" style={{ backgroundImage: 'url("src/Assets/Images/Main/actividades-bg.jpg")' }}>


        <div className="login grid place-content-center border border-black h-1/2 p-56 bg-white rounded-xl" >
            <div className="titulo text-3xl mb-4 font-bold">
                <h2>Recuperar contraseña</h2>
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
               

           
                <div className="iniciar-sesion mt-6">
                <Boton textoBoton="Cancelar" onClick={cancelar}/>
                    <Boton textoBoton="Enviar"/>
                </div>
            </div>
           
        </div>
    </div>
    );
}