package com.hogarTafi.hogarTafi.medicamento.servicio.implement;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicacion;
import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;
import com.hogarTafi.hogarTafi.medicamento.repositorio.RMedicamento;
import com.hogarTafi.hogarTafi.paciente.repositorio.RPaciente;
import com.hogarTafi.hogarTafi.medicamento.servicio.MedicamentoService;

import java.util.List;
import java.util.Optional;


@Service
public class MedicamentoServiceImpl implements MedicamentoService {
    @Autowired
    private RMedicamento repositorioMedicacion;

    @Autowired
    private RPaciente repositorioPacientes;

    public boolean registrarMedicamento(Integer dni, List<EMedicamento> medicamentoRequestList) {

        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }
    
        // Buscar si ya existe un documento de medicación para el paciente
        Optional<EMedicacion> medicacionOpt = repositorioMedicacion.findByDni(dni);
    
        EMedicacion medicacion;
    
        if (medicacionOpt.isPresent()) {
            // Si ya existe un documento de medicación, lo usamos
            medicacion = medicacionOpt.get();
    
            // Limpiar la lista de medicamentos antes de agregar los nuevos
            medicacion.getMedicamentos().clear();
        } else {
            // Si no existe, creamos un nuevo documento de medicación
            medicacion = new EMedicacion();
            medicacion.setDni(dni); // Establecer el DNI como clave primaria
        }
    
        // Recorrer cada medicamento de la lista
<<<<<<< HEAD
        for (EMedicamento medicamentoRequest : medicamentoRequestList) {
            EMedicamento medicamento = new EMedicamento();
    
            // Obtener y asignar los valores de cada atributo
            medicamento.setMedicamento(medicamentoRequest.getMedicamento());
            medicamento.setHorario_1(medicamentoRequest.getHorario_1());
            medicamento.setDesayuno(medicamentoRequest.getDesayuno());
            medicamento.setAlmuerzo(medicamentoRequest.getAlmuerzo());
            medicamento.setMerienda(medicamentoRequest.getMerienda());
            medicamento.setCena(medicamentoRequest.getCena());
            medicamento.setHorario_2(medicamentoRequest.getHorario_2());
            medicamento.setObservaciones(medicamentoRequest.getObservaciones());
    
            // Agregar cada medicamento a la lista de medicamentos de la medicación del paciente
            medicacion.getMedicamentos().add(medicamento);
        }
=======
        // Recorrer cada medicamento de la lista
for (EMedicamento medicamentoRequest : medicamentoRequestList) {


    // Imprimir cada atributo para verificar los valores
    System.out.println("Medicamento: " + medicamentoRequest.getMedicamento());
    System.out.println("Horario 1: " + medicamentoRequest.getHorario_1());
    System.out.println("Desayuno: " + medicamentoRequest.getDesayuno());
    System.out.println("Almuerzo: " + medicamentoRequest.getAlmuerzo());
    System.out.println("Merienda: " + medicamentoRequest.getMerienda());
    System.out.println("Cena: " + medicamentoRequest.getCena());
    System.out.println("Horario 2: " + medicamentoRequest.getHorario_2());
    System.out.println("Observaciones: " + medicamentoRequest.getObservaciones());
    
    // Agregar cada medicamento a la lista de medicamentos de la medicación del paciente
    medicacion.getMedicamentos().add(medicamentoRequest);
    
    // Separador para cada medicamento
    System.out.println("----------------------------------");
}

>>>>>>> c7bf8c2c914a8986a163261c68f49e60bc1f6e05
    
        // Guardar o actualizar el documento de medicación con la nueva lista de medicamentos
        repositorioMedicacion.save(medicacion);
    
        return true; // Medicamentos registrados con éxito
    }
    
    

    public EMedicacion buscarMedicacionPorDni(Integer dni) {
        return repositorioMedicacion.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

    
    public List<EMedicacion> buscarMedicacion(){
        return repositorioMedicacion.findAll(); // Devuelve la primera medicación registrada en la base de datos
    }

}
