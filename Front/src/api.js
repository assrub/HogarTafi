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

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }


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