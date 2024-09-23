import React, {useState} from "react";
import Listado from "./ListadoUsuarios/Listado";
import CampoTexto from "./FormPacientes/CampoTexto";


export default function ListadoUsuarios() {

  const [formregistrar, setFormRegistrar] = useState(false);

      function registrarUsuario(){
        setFormRegistrar(true);
      }


  return (
<>

<div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
        <h2 className="font-bold">Listado de usuarios</h2>
      </div>

      <div className="registrarUsuario mb-4 mx-4">
        <button 
        onClick={registrarUsuario}
        className="flex text-xl text-green-600 border border-green-600 rounded-lg p-2 hover:bg-green-600 hover:text-white hover:border-[#017a98]">
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
          Registrar usuario
        </button>
      </div>

    {formregistrar && (
      <div className="registrarUsuario mx-4">
        <form action="submmit">
        <CampoTexto
        textoEtiqueta="Nombre"
        propsLabel={{ labelFor: "nombre" }}
        propsInput={{
          type: "text",
          name: "nombre",
          id: "inputNombre",
          value: "",
          
        }}
      />

<CampoTexto
        textoEtiqueta="Apellido"
        propsLabel={{ labelFor: "apellido" }}
        propsInput={{
          type: "text",
          name: "apellido",
          id: "inputApellido",
          value: "",
          
        }}
      />

<CampoTexto
        textoEtiqueta="Apellido"
        propsLabel={{ labelFor: "apellido" }}
        propsInput={{
          type: "text",
          name: "apellido",
          id: "inputApellido",
          value: "",
          
        }}
      />
      <CampoTexto
        textoEtiqueta="Correo electronico"
        propsLabel={{ labelFor: "email" }}
        propsInput={{
          type: "email",
          name: "email",
          id: "inputEmail",
          value: "",
          
        }}  
      />

<CampoTexto
        textoEtiqueta="DNI"
        propsLabel={{ labelFor: "dni" }}
        propsInput={{
          type: "number",
          name: "dni",
          id: "inputDni",
          value: "",
          
        }}
      />
      <CampoTexto
        textoEtiqueta="Telefono"
        propsLabel={{ labelFor: "telefono" }}
        propsInput={{
          type: "number",
          name: "telefono",
          id: "inputTelefono",
          value: "",
          
        }}
      />

<CampoTexto
        textoEtiqueta="Direccion"
        propsLabel={{ labelFor: "direccion" }}
        propsInput={{
          type: "text",
          name: "direccion",
          id: "inputDireccion",
          value: "",
          
        }}
      />

      
        </form>
      </div>
    )}
    {!formregistrar && (
      <div className="mx-4">
      

      <div className="listadoUsuarios">
        <Listado></Listado>
      </div>
    </div>
    )}
    </>
  );
}
