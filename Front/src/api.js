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

export async function guardarMedicamentosApi(medicamentoData, dni) {
    try {
        // Convertir FormData a un objeto JavaScript
        let obj = {};
        medicamentoData.forEach((value, key) => {
            obj[key] = value;
        });

        // Verificar qué datos se están enviando
        console.log(obj);

        const response = await fetch(`http://localhost:8080/medicamento/${dni}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Indicar que envías un JSON
            },
            body: JSON.stringify(obj),  // Convertir el objeto a JSON
        });

        return ok;
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