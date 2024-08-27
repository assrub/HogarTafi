export async function todosLosPacientes() {
  const response = await fetch("http://localhost:8080/pacientes");
  const data = await response.json();
  return data;
}


export async function registrarPaciente(paciente = {}) {
  try {
    const url = "http://localhost:8080/pacientes";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(paciente),  
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error registrando paciente:", error);
    return error;
  }
}
