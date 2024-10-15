export async function todosLosPacientes() {
  const response = await fetch("http://localhost:8080/pacientes");
  const data = await response.json();
  return data;
}

export async function registrarPaciente(formData) {
    try {
               
        const response = await fetch("http://localhost:8080/pacientes", {
            method: "POST",
            body: formData,
        });

        return response.ok;
    } catch (error) {
        console.error('Error al registrar el paciente:', error);
        return error;
    }
}


export async function desactivarPAcientes(dni){
    const response = await fetch(`http://localhost:8080/pacientes/desactivar/${dni}`, {
        method: "PATCH",
    });
    return response

}

export async function modificarPaciente(dni, formData){
    const response = await fetch(`http://localhost:8080/pacientes/modificar/${dni}`, {
        method: "PATCH",
        body: formData
    });
    return response

}

export async function guardarStockApi(arregloStock, dni){
    try {
               
        const response = await fetch(`http://localhost:8080/stock/${dni}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(arregloStock), 
        });
        return response.ok;
    } catch (error) {
        console.error('Error al registrar el stock del paciente:', error);
        return error;
    }
}

export async function traerStockApi(dni){
    const response = await fetch(`http://localhost:8080/stock/${dni}`);
  const data = await response.json();
  return data;
}

export async function guardarMedicamentosApi(arregloMedicamento, dni) {
    try {
        const response = await fetch(`http://localhost:8080/medicamento/${dni}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(arregloMedicamento), 
        });

        return response.ok;
    } catch (error) {
      console.error('Error al registrar los medicamentos del paciente:', error);
      return error;
    }
  }
   

function imprimirFormData(formData){
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
}

export async function traerMedicamentosApi(dni){
    const response = await fetch(`http://localhost:8080/medicamento/${dni}`);
  const data = await response.json();
  return data;
}

export async function registrarUsuarioApi(formData) {
    try {
               
        const response = await fetch("http://localhost:8080/usuarios", {
            method: "POST",
            body: formData,
        });

        return response;

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return error;
    }
}

export default async function traerUsuariosApi(){
    const response = await fetch("http://localhost:8080/usuarios");
    const data = await response.json();


    return await data;
}

export  async function desactivarUsuarioApi(dni){
    try{
        const response = await fetch(`http://localhost:8080/usuarios/desactivar/${dni}`, {
            method: "PATCH",
        });
        return response
    }catch(error){
        console.error(error);
    }
    
}

export async function iniciarSesionApi(datosUsuario){
    try {
               
        const response = await fetch('http://localhost:8080/usuarios/inicioSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario), 
        });
       
        return response;

    } catch (error) {
        console.error('Error al iniciar sesion:', error);
        return error;
    }
}

export async function restarMedicaionApi(arregloMedicamento,dni){
    try {
        const response = await fetch(`http://localhost:8080/stock/${dni}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(arregloMedicamento), 
        });

        return response.ok;
    } catch (error) {
      console.error('Error al restar los medicamentos del stock del paciente:', error);
      return error;
    }
  }

  export async function traerTodosLosSotcksApi(){
    const response = await fetch("http://localhost:8080/stock/todosLosStocks");
  const data = await response.json();
  return data;
  }

  
  export async function recuperarContraApi(formData){
    try {
               
        const response = await fetch("http://localhost:8080/send-mail", {
            method: "POST",
            body: formData,
        });



        return response;

    } catch (error) {
        console.error('Error al recuperar contraseña: ', error);
        return error;
    }
}

export async function nuevosDatosApi(formData){
    try {
               
        const response = await fetch("http://localhost:8080/api/token", {
            method: "POST",
            body: formData,
        });

        return response;

    } catch (error) {
        console.error('Error al recuperar contraseña: ', error);
        return error;
    }
}

export async function guardarFotoDamiliarApi(formData){
    try {
               
        const response = await fetch("http://localhost:8080/api/fotos", {
            method: "POST",
            body: formData,
        });
        return response;
    } catch (error) {
        console.error('Error al guardar la foto:', error);
        return error;
    }
}

export async function traerTodasLasFotosApi(){
    const response = await fetch("http://localhost:8080/api/fotos");
  const data = await response.json();
  return data;
}

export async function traerTodasLasFotosDniApi(dniAsociado){
    const response = await fetch(`http://localhost:8080/api/fotos/${dniAsociado}`);
  const data = await response.json();
  return data;
}

export async function actualizarStockApi(dni,formData){
    try {
               
        const response = await fetch(`http://localhost:8080/stock/${dni}`, {
            method: "PATCH",
            body: formData,
        });
        return response;
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        return error;
    }

}

export async function eliminarFotoApi(dni,id){
    try {
               const formData = new FormData()
               formData.append("dni",dni);
               formData.append("fotoId",id)
        const response = await fetch(`http://localhost:8080/api/fotos`, {
            method: "DELETE",
            body: formData,
        });
        return response;
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        return error;
    }
}