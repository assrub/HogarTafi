// Conectar a la base de datos 'hogarTafi'
db = db.getSiblingDB('hogarTafi');

// Crear la colección 'Pacientes'
db.createCollection('Pacientes');

// Insertar un documento con los datos mostrados en la imagen
db.Pacientes.insert({
  "_id": 33, // Int32
  "nombre": "Pepe",
  "apellido": "aaaaaaaaaaaaaaaaa",
  "obraSocial": "Obra Social",
  "activo": true,
  "observaciones": "Observaciones",
  "fotoFrenteCarnet": BinData(0, ""), // Binary data
  "fotoAtrasCarnet": BinData(0, ""), // Binary data
  "fotoFrenteDni": BinData(0, ""), // Binary data
  "fotoAtrasDni": BinData(0, ""), // Binary data
  "_class": "com.hogarTafi.hogarTafi.Entidad.Paciente" // Class name in MongoDB
});