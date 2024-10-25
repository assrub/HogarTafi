import React, {useEffect, useState} from "react";
import traerUsuariosApi from "../../api";
import CampoTexto from "./CampoTexto";
import CartelAviso from "../Modal/CartelAviso";



export default function DatosFamiliar({dniPaciente}){
const [usuario,setUsuario] = useState({});


useEffect(()=>{
traerUsuarios();
console.log(usuario);
},[,dniPaciente])

async function traerUsuarios(){
    const response = await traerUsuariosApi();
    response.forEach(element => {
        if (element.asociado == dniPaciente){
            setUsuario(element);
            return;
        }
        setUsuario({nombre:"",
            apellido:"",
            direccion:"",
            telefono:"",
            email:"",
            dni:"",

        })
    });
}

    return(
    <div className="fborder rounded-lg shadow-md max-w-md m-auto">
         

    <div className="datos w-full">
    <div className="titulo flex justify-center text-xl lg:text-xl lg:mt-5 mb-4">
            <h2 className="text-bold">
              <strong>Contacto del familiar</strong>
            </h2>
          </div>
        <form onSubmit={(e) => { e.preventDefault()}} className="p-4 bg-white shadow-md">

            {/* Campo NOMBRE */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    NOMBRE
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputNombre" }}
                        propsInput={{
                            type: "text",
                            name: "nombre",
                            id: "inputNombre",
                            value: usuario.nombre,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            {/* Campo APELLIDO */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    APELLIDO
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputApellido" }}
                        propsInput={{
                            type: "text",
                            name: "apellido",
                            id: "inputApellido",
                            value: usuario.apellido,
                           className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            {/* Campo DNI */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    DNI
                </div>
                <div className="w-full">
                    <CampoTexto
                        error={false}
                        obligatorio={true}
                        propsLabel={{ labelFor: "inputDni" }}
                        propsInput={{
                            type: "number",
                            name: "dni",
                            id: "inputDni",
                            value: usuario.dni,
                            readOnly: true,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    DIRECCION
                </div>
                <div className="w-full">
                    <CampoTexto
                        propsLabel={{ labelFor: "inputDireccion" }}
                        propsInput={{
                            type: "text",
                            name: "direccion",
                            id: "inputDireccion",
                            value: usuario.direccion,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            {/* Campo TELEFONO */}
            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    TELEFONO
                </div>
                <div className="w-full">
                    <CampoTexto
                        propsLabel={{ labelFor: "inputTelefono" }}
                        propsInput={{
                            type: "text",
                            name: "telefono",
                            id: "inputTelefono",
                            value: usuario.telefono,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row mb-2">
                <div className="sm:flex-1 min-w-[140px] text-gray-700 pl-2 text-white bg-gray-400 flex items-center">
                    CORREO ELECTRONICO
                </div>
                <div className="w-full">
                    <CampoTexto
                        propsLabel={{ labelFor: "inputEmail" }}
                        propsInput={{
                            type: "text",
                            name: "email",
                            id: "inputEmail",
                            value: usuario.email,
                            className: "w-full bg-gray-200 border border-neutral-300 p-2 focus:outline-none"
                        }}
                    />
                </div>
            </div>

           

          
        </form>
    </div>
   
</div>

    );
}
 
