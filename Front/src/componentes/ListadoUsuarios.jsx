import React, {useState, useEffect} from "react";
import Listado from "./ListadoUsuarios/Listado";
import CampoTexto from "./FormPacientes/CampoTexto";
import Boton from "./Boton"
import { todosLosPacientes, registrarUsuarioApi } from "../api";
import CartelAviso from "./CartelAviso";


export default function ListadoUsuarios() {

  const [formregistrar, setFormRegistrar] = useState(false);

  const [tipoUsuario,setTipoUsuario] = useState(
    {"familiar" : false,
    "admin" : false,
    "empleado": false
  })

  const[usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    direccion: "",
    contra: "",
    tipo: "",
    asociado: ""
  })
  const [pacientes, setPacientes] = useState([]);

  const [guardado,setGuardado] = useState(null);
  const [mostrarCartel, setMostrarCartel] = useState(false)
  const [campoIncompleto, setCampoIncompleto] = useState(false);

  const toggleModal = () => setMostrarCartel(!mostrarCartel);


  async function traerPacientes() {
    const datos = await todosLosPacientes();
    const datosFiltrados = datos.filter((paciente) => paciente !== null);
    setPacientes(datosFiltrados);
  
  }
  
  useEffect(() =>{

  },[formregistrar])
 
  useEffect(() => { 
    traerPacientes();
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

      function mostrarFormRegistroUsuario(){
        setFormRegistrar(true);
      }

      function volver(){
        setFormRegistrar(false);
      }

      const handleSelectChange = (event) => {
        const value = event.target.value;
    
       
        setTipoUsuario({
          familiar: value === 'familiar',
          admin: value === 'admin',
          empleado: value === 'empleado'
        });
      };

      function generarContrasena(longitud = 12) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let contrasena = '';
      
        for (let i = 0; i < longitud; i++) {
          const randomIndex = Math.floor(Math.random() * caracteres.length);
          contrasena += caracteres[randomIndex];
        }
      
        usuario.contra = contrasena;
      }

      useEffect(() =>(
        generarContrasena()
      ),[])

      async function registrarUsuario(e){

        e.preventDefault();
        const tipoSeleccionado = Object.keys(tipoUsuario).find(key => tipoUsuario[key] === true);
        let pacienteAsociado = null;
        if(tipoSeleccionado == "familiar"){
          pacienteAsociado = document.getElementById("select-paciente").value; ;
        }
        
        
        const formData = new FormData();
        formData.append("nombre",usuario.nombre);
        formData.append("apellido",usuario.apellido),
        formData.append("dni",parseInt(usuario.dni));
        formData.append("email",usuario.email);
        formData.append("password", usuario.contra);
        formData.append("direccion",usuario.direccion);
        formData.append("telefono",usuario.telefono);
        formData.append("asociado", pacienteAsociado ? pacienteAsociado : null);
        formData.append("tipo",tipoSeleccionado);
        const response = await registrarUsuarioApi(formData);

        if (response.ok){
          setGuardado(true);
        }else{
          setGuardado(false);
        }

      

        toggleModal();
        if(guardado){
        
          setUsuario({
            nombre: "",
            apellido: "",
            email: "",
            dni: "",
            telefono: "",
            direccion: "",
            contra: "",
            tipo: "",
            asociado: ""
          });
        }

        console.log(response);
        console.log(usuario);
        console.log(pacienteAsociado);
        console.log(tipoSeleccionado);
      }

  
  return (
<>

<div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10 ">
        <h2 className="font-bold">Listado de usuarios</h2>
      </div>

      <div className="registrarUsuario mb-4 mx-4">
        <button 
        onClick={mostrarFormRegistroUsuario}
        className={`flex text-xl text-green-600 border border-green-600 rounded-lg p-2 
        hover:bg-green-600 hover:text-white hover:border-[#017a98] ${formregistrar ? "hidden":""}`}>
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            ></path>
          </svg>
          Registrar usuario
        </button>
      </div>

    {formregistrar && (
      <div className="registrarUsuario mx-4">
       <form action="">
  <CampoTexto
    textoEtiqueta="Nombre"
    propsLabel={{ labelFor: "nombre" }}
    propsInput={{
      type: "text",
      name: "nombre",
      id: "inputNombre",
      value: usuario.nombre,  
      onChange: handleInputChange
    }}
  />

  <CampoTexto
    textoEtiqueta="Apellido"
    propsLabel={{ labelFor: "apellido" }}
    propsInput={{
      type: "text",
      name: "apellido",
      id: "inputApellido",
      value: usuario.apellido,  
      onChange: handleInputChange
    }}
  />
  <CampoTexto
    textoEtiqueta="Correo electronico"
    propsLabel={{ labelFor: "email" }}
    propsInput={{
      type: "email",
      name: "email",
      id: "inputEmail",
      value: usuario.email, 
      onChange: handleInputChange
    }}  
  />
  <CampoTexto
    textoEtiqueta="Contraseña temporal"
    propsLabel={{ labelFor: "contra" }}
    propsInput={{
      type: "text",
      name: "contra",
      id: "inputContra",
      value: usuario.contra,  
      onChange: handleInputChange 
    }}
  />

  <CampoTexto
    textoEtiqueta="DNI"
    propsLabel={{ labelFor: "dni" }}
    propsInput={{
      type: "number",
      name: "dni",
      id: "inputDni",
      value: usuario.dni,  
      onChange: handleInputChange
    }}
  />
  <CampoTexto
    textoEtiqueta="Telefono"
    propsLabel={{ labelFor: "telefono" }}
    propsInput={{
      type: "number",
      name: "telefono",
      id: "inputTelefono",
      value: usuario.telefono,  
      onChange: handleInputChange
    }}
  />

  <CampoTexto
    textoEtiqueta="Direccion"
    propsLabel={{ labelFor: "direccion" }}
    propsInput={{
      type: "text",
      name: "direccion",
      id: "inputDireccion",
      value: usuario.direccion,  
      onChange: handleInputChange 
    }}
  />


  <div className="tipo-usuario mt-2">
  <select name="paciente" 
  id="select-usuario" 
  className="bg-gray-200 rounded-lg w-2/5 p-2" 
  onChange={handleSelectChange}
  >
  <option selected disabled value="seleccionar-un-tipo-usuario">Selecciona el tipo de usuario</option>
  <option value="admin">Administrador del sistema</option>
  <option value="familiar">Familiar de paciente</option>
  <option value="empleado">Empleado del hogar</option>
  </select>
  </div>

{tipoUsuario.familiar && (
  <div className="select-pacientes mt-4">
    <h3>Selecciona el paciente asociado al familiar</h3>
  <select name="paciente" id="select-paciente" className="bg-gray-200 rounded-lg w-2/5 p-2" >
            <option selected disabled value="seleccionar-un-paciente">Selecciona un paciente</option>
            {pacientes.map((paciente,index) =>(
              <option key={index} value={paciente.dni}>{paciente.nombre + ' ' + paciente.apellido}</option>
            ))}  
            </select>
  </div>
)}



  <div className="botones mt-4">
    <Boton textoBoton="Volver" onClick={volver} />
    <Boton textoBoton="Registrar" onClick={registrarUsuario} />     
  </div>
</form>

<div className="modal">
            <CartelAviso
        abrirModal={mostrarCartel}
        cerrarModal={toggleModal}
        mensaje={guardado ? 'Usuario registrado correctamente' : 'Error al registrar el usuario'}
      />
            </div>
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
