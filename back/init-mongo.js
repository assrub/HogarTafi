// Conectar a la base de datos 'hogarTafi'
db = db.getSiblingDB('hogarTafi');

// Insertar un documento en la colección 'Pacientes'
db.Pacientes.insert({
  "_id": 33, // Int32
  "nombre": "Pepe",
  "apellido": "aaaaaaaaaaaaaaaaa",
  "obraSocial": "Obra Social",
  "activo": true,
  "observaciones": "Observaciones",
  "fotoFrenteCarnet": BinData(0, ""), // Binary data
  "fotoAtrasCarnet": BinData(0, ""),  // Binary data
  "fotoFrenteDni": BinData(0, ""),    // Binary data
  "fotoAtrasDni": BinData(0, ""),     // Binary data
  "_class": "com.hogarTafi.hogarTafi.paciente.entidad.Paciente"  // Clase correcta para Paciente
});

// Insertar un documento en la colección 'Usuarios'
db.Usuarios.insert({
  "nombre": "Agustin", // Nombre como string
  "apellido": "Lebed",
  "dni": NumberInt(42323981), // Dni como número
  "email": "agus.lebed@gmail.com",
  "direccion": "123213",
  "asociado": "",
  "tipo": "admin",
  "_class": "com.hogarTafi.hogarTafi.usuario.entidad.Usuarios"  // Clase correcta para Usuarios
});
