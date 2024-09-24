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

export async function guardarStockApi(formData, dni){
    try {
               
        const response = await fetch(`http://localhost:8080/stock/${dni}`, {
            method: "POST",
            body: formData,
        });

        return response.ok;
    } catch (error) {
        console.error('Error al registrar el stock del paciente:', error);
        return error;
    }
}

export async function guardarMedicamentosApi(arregloMedicamento, dni) {
    try {
<<<<<<< HEAD
      console.log(medicamentoData); // Aquí debería mostrarse el array de objetos
  
      const response = await fetch(`http://localhost:8080/medicamento/${dni}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicamentoData), // Enviar directamente el array de objetos
      });
  
      return response.ok;
=======

        console.log(JSON.stringify(arregloMedicamento));

        const response = await fetch(`http://localhost:8080/medicamento/${dni}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(arregloMedicamento), 
        });

        return response.ok;
>>>>>>> c7bf8c2c914a8986a163261c68f49e60bc1f6e05
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