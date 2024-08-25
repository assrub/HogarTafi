db = db.getSiblingDB('hogarTafi'); // Cambia a la base de datos hogarTafi
db.createCollection('Pacientes'); // Crea una colección de ejemplo

db.Pacientes.insert({
  "nombre": "alejo",
  "apellido": "diaz",
  "dni": "333333333",
  "obraSocial": "pami",
  "activo": true,  // Cambié "true" a true sin comillas para que sea un valor booleano
  "observaciones": "no toma pastilla le gusta la pala",
  "fotoFrenteCarnet": "",
  "fotoAtrasCarnet": "",
  "fotoFrenteDni": "",
  "fotoAtrasDni": ""
}); // Inserta un documento de ejemplo
