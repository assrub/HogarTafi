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

    public boolean registrarMedicamento(Integer dni, EMedicamento medicamentoRequest) {

        EMedicamento medicamento = new EMedicamento();
        medicamento.setMedicamento(medicamentoRequest.getMedicamento());
        medicamento.setHorario_1(medicamentoRequest.getHorario_1());
        medicamento.setDesayuno(medicamentoRequest.getDesayuno());
        medicamento.setAlmuerzo(medicamentoRequest.getAlmuerzo());
        medicamento.setMerienda(medicamentoRequest.getMerienda());
        medicamento.setCena(medicamentoRequest.getCena());
        medicamento.setHorario_2(medicamentoRequest.getHorario_2());
        medicamento.setObservaciones(medicamentoRequest.getObservaciones());


        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }
        
        // Buscar si ya existe un documento de medicación para el paciente
        Optional<EMedicacion> medicacionOpt = repositorioMedicacion.findByDni(dni);


        if (medicacionOpt.isPresent()) {
            // Si ya existe un documento de medicación, agregar el nuevo medicamento
            EMedicacion medicacionExistente = medicacionOpt.get();
            medicacionExistente.getMedicamentos().add(medicamento);
            repositorioMedicacion.save(medicacionExistente);
        } else {
            // Si no existe, crear un nuevo documento de medicación
            EMedicacion nuevaMedicacion = new EMedicacion();
            nuevaMedicacion.setDni(dni); // Establecer el DNI como clave primaria
            nuevaMedicacion.getMedicamentos().add(medicamento); // Agregar el nuevo medicamento
            repositorioMedicacion.save(nuevaMedicacion); // Guardar el nuevo documento
        }

        return true; // Medicamento registrado con éxito
    }

    public EMedicacion buscarMedicacionPorDni(Integer dni) {
        return repositorioMedicacion.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

    
    public List<EMedicacion> buscarMedicacion(){
        return repositorioMedicacion.findAll(); // Devuelve la primera medicación registrada en la base de datos
    }

}
