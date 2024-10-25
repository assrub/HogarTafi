import React, {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CampoTexto from "../../componentes/FormPacientes/CampoTexto";
import Boton from "../../componentes/Botones/Boton";
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

    return (<>
        <div className="grid h-screen place-items-center">
          <div className="login grid place-content-center border border-black p-10 sm:p-8 lg:p-56 bg-white rounded-xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full">
            <div className="titulo text-3xl mb-4 font-bold text-center">
              <h2>Recuperación de contraseña</h2>
            </div>
            <div className="formulario">
              <div className="nuevaContra mb-4">
                <CampoTexto 
                  //textoEtiqueta="Nueva contraseña"
                  error={campoIncompleto}
                  obligatorio={true}
                  propsLabel={{ labelFor: "password" }}
                  propsInput={{
                    type: "password",
                    name: "nuevaContra",
                    id: "inputContra1",
                    placeholder: "Nueva contraseña",
                    value: datosRecuperacion.nuevaContra,
                    onChange: handleInputChange,
                    className: "p-3 w-full border rounded-md"
                  }}
                />
              </div>
      
              <div className="confirmacion mb-4">
                <CampoTexto 
                  //textoEtiqueta="Confirmación"
                  error={campoIncompleto}
                  obligatorio={true}
                  propsLabel={{ labelFor: "password" }}
                  propsInput={{
                    type: "password",
                    name: "confirmacion",
                    id: "inputConfirmacion",
                    placeholder: "Confirmación",
                    value: datosRecuperacion.confirmacion,
                    onChange: handleInputChange,
                    className: "p-3 w-full border rounded-md"
                  }}
                />
              </div>
      
              <div className="iniciar-sesion mt-6 flex justify-between">
                <Boton textoBoton="Cancelar" onClick={cancelar} className="w-1/2 mr-2" />
                <Boton textoBoton="Enviar" onClick={enviarNuevosDatos} className="w-1/2 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </>
      )
}