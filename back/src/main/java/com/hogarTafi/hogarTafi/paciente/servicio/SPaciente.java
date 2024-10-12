package com.hogarTafi.hogarTafi.paciente.servicio;

import java.util.List;
import java.util.Map;

import com.hogarTafi.hogarTafi.paciente.entidad.EPaciente;

public interface SPaciente {
    List<EPaciente> todosLosPacientes();

    boolean guardarPaciente(EPaciente PacienteDtos);
   
    EPaciente buscarPaciente(Integer dni);

    boolean desactivarPaciente(Integer dni);

    boolean actualizarPaciente(EPaciente PacienteDtos);

    String convertirABase64(byte[] bytes);

    List<Map<String, Object>> obtenerPacientesConFotos();
}
