import React, {useState, useEffect} from "react";
import Listado from "./ListadoUsuarios/Listado";
import CampoTexto from "./FormPacientes/CampoTexto";
import Boton from "./Botones/Boton"
import { todosLosPacientes, registrarUsuarioApi } from "../api";
import CartelAviso from "./Modal/CartelAviso";


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

      async function registrarUsuario(e) {
        e.preventDefault(); // Mueve esto aquí para asegurarte de que no se ejecute antes
      
        let pacienteAsociado = null;
        const tipoSeleccionado = Object.keys(tipoUsuario).find(key => tipoUsuario[key] === true);
      
        if (tipoSeleccionado === undefined) {
          alert("Selecciona el tipo de usuario");
          return;
        }
      
        if (tipoSeleccionado === "familiar") {
          pacienteAsociado = document.getElementById("select-paciente").value;
        }
      
        const formData = new FormData();
        formData.append("nombre", usuario.nombre);
        formData.append("apellido", usuario.apellido);
        formData.append("dni", parseInt(usuario.dni));
        formData.append("email", usuario.email);
        formData.append("password", usuario.contra);
        formData.append("direccion", usuario.direccion);
        formData.append("telefono", usuario.telefono);
        formData.append("asociado", pacienteAsociado ? pacienteAsociado : null);
        formData.append("tipo", tipoSeleccionado);
      
        const response = await registrarUsuarioApi(formData);
      
        if (response.ok) {
          setGuardado(true);
        } else {
          setGuardado(false);
        }
      
        toggleModal();
      
        // Limpieza de campos y tipo de usuario
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
      
        setTipoUsuario({
          familiar: false,
          admin: false,
          empleado: false
        });
      }
      

  
  return (<>
    <div className="registrar-pacientes w-full">
      <div className="titulo flex justify-center text-xl lg:text-3xl lg:mt-5 mb-10">
        <h2 className="font-bold">Listado de usuarios</h2>
      </div>
      
      {formregistrar && (
        <div className="border rounded-lg p-3 m-auto shadow-md max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="registrarUsuario">
            <form action="">
              {[
                { name: "nombre", type: "text" },
                { name: "apellido", type: "text" },
                { name: "email", type: "email" },
                { name: "contra", type: "text" },
                { name: "dni", type: "number", min: 0, max: 999999999 },
                { name: "telefono", type: "number" },
                { name: "direccion", type: "text" },
              ].map((campo) => (
                <CampoTexto
                  key={campo.name}
                  textoEtiqueta={campo.label}
                  error={campoIncompleto}
                  obligatorio={true}
                  propsLabel={{ labelFor: campo.name }}
                  propsInput={{
                    placeholder: campo.name,
                    type: campo.type,
                    name: campo.name,
                    id: `input${campo.name.charAt(0).toUpperCase() + campo.name.slice(1)}`,
                    value: usuario[campo.name],
                    onChange: handleInputChange,
                    min: campo.min,
                    max: campo.max,
                  }}
                />
              ))}
  
              <div className="tipo-usuario mt-5">
                <select
                  name="paciente"
                  id="select-usuario"
                  className="bg-gray-200 rounded-lg w-full p-2"
                  onChange={handleSelectChange}
                >
                  <option selected disabled value="seleccionar-un-tipo-usuario">
                    Tipo de usuario
                  </option>
                  <option value="admin">Administrador del sistema</option>
                  <option value="familiar">Familiar de paciente</option>
                  <option value="empleado">Empleado del hogar</option>
                </select>
              </div>
  
              {tipoUsuario.familiar && (
                <div className="select-pacientes mt-4">
                  <select
                    name="paciente"
                    id="select-paciente"
                    className="bg-gray-200 rounded-lg w-full lg:w-2/5 p-2"
                  >
                    <option selected disabled value="null">
                      Paciente asociado
                    </option>
                    {pacientes.map((paciente, index) => (
                      <option key={index} value={paciente.dni}>
                        {paciente.nombre + " " + paciente.apellido}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          
              <div className="botones w-full mt-5 flex flex-row">
                <Boton textoBoton="Volver" onClick={volver} />
                <Boton textoBoton="Registrar" onClick={registrarUsuario} />
              </div>
            </form>
  
            <div className="modal">
              <CartelAviso
                abrirModal={mostrarCartel}
                cerrarModal={toggleModal}
                mensaje={guardado ? "Usuario registrado correctamente" : "Error al registrar el usuario"}
              />
            </div>
          </div>
        </div>
      )}
  
      {!formregistrar && (
        <div className="mx-4">
          <div className="registrarUsuario mb-4">
            <button
              onClick={mostrarFormRegistroUsuario}
              className={`flex items-center text-xl text-green-600 border border-green-600 rounded-lg p-2 
                hover:bg-green-600 hover:text-white hover:border-[#017a98] ${formregistrar ? "hidden" : ""}`}
            >
              <svg
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-8 h-8 mr-2"
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
          <div className="listadoUsuarios">
            <Listado />
          </div>
        </div>
      )}
    </div>
  </>
  );
}
