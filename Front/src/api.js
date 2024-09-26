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

        console.log(JSON.stringify(arregloMedicamento));

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