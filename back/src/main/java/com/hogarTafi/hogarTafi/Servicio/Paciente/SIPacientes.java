package com.hogarTafi.hogarTafi.Servicio.Paciente;

import java.util.List;

import com.hogarTafi.hogarTafi.Entidad.Paciente.EPaciente;

public interface SIPacientes {
    List<EPaciente> todosLosPacientes();

    boolean guardarPaciente(EPaciente PacienteDtos);
   
    EPaciente buscarPaciente(EPaciente PacienteDtos);

    boolean desactivarPaciente(EPaciente PacienteDtos);

    boolean actualizarPaciente(EPaciente PacienteDtos);

    String convertirABase64(byte[] bytes);
}
