// Conectar a la base de datos 'hogarTafi'
db = db.getSiblingDB('hogarTafi');

// Insertar un documento en la colección 'Pacientes' con las fotos
db.Pacientes.insert({
  "_id": NumberInt(1),
  "nombre": "nombrePaciente_1",
  "apellido": "apellidoPaciente_1",
  "obraSocial": "obraSocialPaciente_1",
  "activo": true,
  "observaciones": "Observaciones",
  "_class": "com.hogarTafi.hogarTafi.paciente.entidad.EPaciente"
});
