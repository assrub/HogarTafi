package com.hogarTafi.hogarTafi.Servicio.impl;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioMedicacion;
import com.hogarTafi.hogarTafi.Entidad.Medicacion;
import com.hogarTafi.hogarTafi.Entidad.Medicamento;
import com.hogarTafi.hogarTafi.Repositorio.RepositorioPaciente;
import java.util.Optional;


@Service
public class ServicioMedicamento {

    @Autowired
    private RepositorioMedicacion repositorioMedicacion;

    @Autowired
    private RepositorioPaciente repositorioPacientes;

    public boolean registrarMedicamento(Integer dni, String medicamento, String almuerzo, String merienda, String cena, String horario, String observaciones) {
        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }

        // Buscar si ya existe un documento de medicación para el paciente
        Optional<Medicacion> medicacionOpt = repositorioMedicacion.findByDni(dni);

        // Crear el objeto Medicamento con los nuevos parámetros
        Medicamento nuevoMedicamento = new Medicamento(medicamento, almuerzo, merienda, cena, horario, observaciones);

        if (medicacionOpt.isPresent()) {
            // Si ya existe un documento de medicación, agregar el nuevo medicamento
            Medicacion medicacionExistente = medicacionOpt.get();
            medicacionExistente.getMedicamentos().add(nuevoMedicamento);
            repositorioMedicacion.save(medicacionExistente);
        } else {
            // Si no existe, crear un nuevo documento de medicación
            Medicacion nuevaMedicacion = new Medicacion();
            nuevaMedicacion.setDni(dni); // Establecer el DNI como clave primaria
            nuevaMedicacion.getMedicamentos().add(nuevoMedicamento); // Agregar el nuevo medicamento
            repositorioMedicacion.save(nuevaMedicacion); // Guardar el nuevo documento
        }

        return true; // Medicamento registrado con éxito
    }

    
    public Medicacion buscarMedicacionPorDni(Integer dni) {
        return repositorioMedicacion.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

}
