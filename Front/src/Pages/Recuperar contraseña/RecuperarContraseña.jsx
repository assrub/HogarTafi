import React, {useState} from "react";
import CampoTexto from "../../componentes/FormPacientes/CampoTexto";
import Boton from "../../componentes/Botones/Boton";
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route  } from "react-router-dom";
import { recuperarContraApi } from "../../api";


export default function RecuperarContraseña(){

    const [campoIncompleto, setCampoIncompleto] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    function cancelar(){
          navigate('/login')
}

const handleInputChange = (e) => {
    setEmail(e.target.value); 
};

async function recuperarContra(){
    const formData = new FormData();
    formData.append("email", email);
    const response = await recuperarContraApi(formData);
    console.log(response);
    if(response.status  == 200){
        alert("Correo de recuperacion de contraseña enviado-")
    }else{
        alert("Error al intentar recuperar la contraseña.")
    }
}


    return (<div className="grid h-screen place-items-center">
        <div className="login grid place-content-center border border-black p-10 sm:p-8 lg:p-56 bg-white rounded-xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full">
          <div className="titulo text-3xl mb-4 font-bold text-center">
            <h2>Recuperar contraseña</h2>
          </div>
          <div className="formulario">
            <div className="email mb-4">
              <CampoTexto 
                //textoEtiqueta="Correo electronico"
                error={campoIncompleto}
                obligatorio={true}
                propsLabel={{ labelFor: "email" }}
                propsInput={{
                  type: "text",
                  name: "email",
                  id: "inputEmail",
                  placeholder: "Correo electronico",
                  value: email,
                  onChange: handleInputChange,
                  className: "p-3 w-full border rounded-md"
                }}
              />
            </div>
      
            <div className="iniciar-sesion mt-6 flex justify-between">
              <Boton textoBoton="Cancelar" onClick={cancelar} className="w-1/2 mr-2" />
              <Boton textoBoton="Enviar" onClick={recuperarContra} className="w-1/2 ml-2" />
            </div>
          </div>
        </div>
      </div>
      );
}