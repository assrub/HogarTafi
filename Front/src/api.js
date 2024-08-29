export async function todosLosPacientes() {
  const response = await fetch("http://localhost:8080/pacientes");
  const data = await response.json();
  return data;
}

async function pasarImagenABase64(file) {
  return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
          reject(new Error("El primer parámetro debe ser un objeto de tipo Blob o File."));
          return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
          resolve(reader.result);
      };
      reader.onerror = (error) => {
          reject(error);
      };
      reader.readAsDataURL(file);
  });
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