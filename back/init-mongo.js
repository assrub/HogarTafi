// Conectar a la base de datos 'hogarTafi'
db = db.getSiblingDB("hogarTafi");

db.createCollection("Usuarios"); // Crea una colección
db.Usuarios.insert({
  _id: NumberInt(1),
  activo: true,
  nombre: "nombreUSUARIO_1",
  apellido: "apellidoUSUARIO_1",
  email: "emailUSUARIO_1@gmail.com",
  telefono: "telefonoUSUARIO_1",
  direccion: "direccionUSUARIO_1",
  asociado: "osdeUSUARIO_1",
  tipo: "admin",
  password: "1111",
  fotoCarnet: null,
});

db.createCollection("Pacientes"); // Crea una colección
db.Pacientes.insert({
  _id: NumberInt(1),
  activo: true,
  nombre: "nombrePaciente_1",
  apellido: "apellidoPaciente_1",
  obraSocial: "obraSocialPaciente_1",
  observaciones: "Observaciones",
  fotoFrenteCarnet: null,
  fotoAtrasCarnet: null,
  fotoFrenteDni: null,
  fotoAtrasDni: null,
});
