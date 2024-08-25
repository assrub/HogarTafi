export async function todosLosPacientes() {
  const response = await fetch("http://localhost:8080/pacientes");
  const data = await response.json();
  return data;
}

export async function registrarPaciente(paciente = {}) {
  try {
    const url = `http://localhost:8080/pacientes?nombre=${encodeURIComponent(
      paciente.nombre
    )}&apellido=${encodeURIComponent(
      paciente.apellido
    )}&dni=${encodeURIComponent(paciente.dni)}&obraSocial=${encodeURIComponent(
      paciente.obraSocial
    )}&fotoFrenteCarnet=${encodeURIComponent(
      paciente.fotoFrenteCarnet || ""
    )}&fotoAtrasCarnet=${encodeURIComponent(
      paciente.fotoAtrasCarnet || ""
    )}&fotoFrenteDni=${encodeURIComponent(
      paciente.fotoFrenteDni || ""
    )}&fotoAtrasDni=${encodeURIComponent(paciente.fotoAtrasDni || "")}`;

    const response = await fetch(url, {
      method: "POST",
    });

    return response.ok;
  } catch (error) {

    return error;
  }
}
