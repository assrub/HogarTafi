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

export async function guardarMedicamentosApi(medicamentos, dniPaciente) {

    console.log(dniPaciente);
    console.log(medicamentos.medicamento);
    console.log(medicamentos.horario);
    console.log(medicamentos.observaciones);
    console.log(medicamentos.editable);

    // Los datos que quieres enviar
    const medicamentoData = {
        medicamento: ":P",
        almuerzo: "1 tableta",
        merienda: "1 tableta",
        cena: "1 tableta",
        horario: "8:00 AM, 12:00 PM, 7:00 PM",
        observaciones: "Tomar con agua"
    };

    try {
        const response = await fetch(`http://localhost:8080/medicamento/34377745`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Indicar que envías un JSON
            },
            body: JSON.stringify(medicamentoData),  // Convertir el objeto a JSON
        });

        // Retorna true si la respuesta es correcta
        return response.ok;
    } catch (error) {
        console.error('Error al registrar los medicamentos del paciente:', error);
        return false; // Devuelve false en caso de error
    }
}
