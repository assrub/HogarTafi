package com.hogarTafi.hogarTafi.Servicio.Medicamento;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.hogarTafi.hogarTafi.Entidad.Medicamento.EMedicacion;
import com.hogarTafi.hogarTafi.Entidad.Medicamento.EMedicamento;
import com.hogarTafi.hogarTafi.Repositorio.Medicamento.RMedicamento;
import com.hogarTafi.hogarTafi.Repositorio.Paciente.RPaciente;

import java.util.Optional;


@Service
public class SMedicamento {

    @Autowired
    private RMedicamento repositorioMedicacion;

    @Autowired
    private RPaciente repositorioPacientes;

    public boolean registrarMedicamento(Integer dni, String medicamento, String horario_1, String desayuno, String almuerzo, String merienda, String cena, String horario_2, String observaciones) {
        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }

        // Buscar si ya existe un documento de medicación para el paciente
        Optional<EMedicacion> medicacionOpt = repositorioMedicacion.findByDni(dni);

        // Crear el objeto Medicamento con los nuevos parámetros
        EMedicamento nuevoMedicamento = new EMedicamento(medicamento, horario_1, desayuno, almuerzo, merienda, cena, horario_2, observaciones);

        if (medicacionOpt.isPresent()) {
            // Si ya existe un documento de medicación, agregar el nuevo medicamento
            EMedicacion medicacionExistente = medicacionOpt.get();
            medicacionExistente.getMedicamentos().add(nuevoMedicamento);
            repositorioMedicacion.save(medicacionExistente);
        } else {
            // Si no existe, crear un nuevo documento de medicación
            EMedicacion nuevaMedicacion = new EMedicacion();
            nuevaMedicacion.setDni(dni); // Establecer el DNI como clave primaria
            nuevaMedicacion.getMedicamentos().add(nuevoMedicamento); // Agregar el nuevo medicamento
            repositorioMedicacion.save(nuevaMedicacion); // Guardar el nuevo documento
        }

        return true; // Medicamento registrado con éxito
    }

    
    public EMedicacion buscarMedicacionPorDni(Integer dni) {
        return repositorioMedicacion.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

}
