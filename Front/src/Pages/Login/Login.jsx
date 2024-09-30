import React, {useState} from "react";
import CampoTexto from "../../componentes/FormPacientes/CampoTexto";
import Boton from "../../componentes/Boton";
import { useNavigate } from 'react-router-dom';
import { Link, Routes, Route  } from "react-router-dom";
import { iniciarSesionApi } from "../../api";
import { useSesionUsuario } from "../../contexto/sesionUsuario";


export default  function Login(){
    const { iniciarSesionContexto } = useSesionUsuario();
    const [campoIncompleto, setCampoIncompleto] = useState(false);
    const [usuario,setUsuario] = useState({"usuario": "",
        "contra": ""
    })
    const navigate = useNavigate();
    
    
    async function iniciarSesion(){

    
        if (usuario.usuario === "" || usuario.contra === ""){
            setCampoIncompleto(true);
            return;
          } else {
            setCampoIncompleto(false);
          }

          const datosUsuario = {"nombreUsuario" : usuario.usuario,
            "password" : usuario.contra
          }
          
          const response  = await iniciarSesionApi(datosUsuario);
          console.log(response);

          if (response.ok) {
            const datos = await response.json();
            const datosDelUsuario = {
              nombre: datos.nombre,
              apellido: datos.apellido,
              email: datos.email,
              dni: datos.dni,
              telefono: datos.telefono,
              direccion: datos.direccion,
              tipo: datos.tipo,
              asociado: datos.asociado
            };
      
            iniciarSesionContexto(datosDelUsuario); 
      
            navigate('/userPanel');
          }else{
            alert("Datos incorrectos")
          }
          

}
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
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
                        name: "usuario",
                        id: "inputEmail",
                        value:usuario.usuario,
                        placeholder: "Correo electronico",
                        onChange: handleInputChange
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
                        name: "contra",
                        value: usuario.contra,
                        id: "inputContraseña",
                        placeholder: "Contraseña",
                        onChange: handleInputChange
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