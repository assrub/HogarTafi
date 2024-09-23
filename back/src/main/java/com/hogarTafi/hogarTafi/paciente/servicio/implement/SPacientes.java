package com.hogarTafi.hogarTafi.Servicio.Paciente;

import java.util.List;

import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Entidad.Paciente.EPaciente;

public interface SPacientes {
    List<EPaciente> todosLosPacientes();

    boolean guardarPaciente(Integer dni, String nombre, String apellido, String obraSocial, Boolean activo, String observaciones,
                            byte[] fotoFrenteCarnet, byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni);

    EPaciente buscarPaciente(Integer dni);

    boolean desactivarPaciente(OcultarPacienteConsulta consulta);

    boolean modificarPaciente(Integer dni,
                              String nombre,
                              String apellido,
                              String obraSocial,
                              String observaciones,
                              byte[] fotoFrenteCarnetBytes,
                              byte[] fotoAtrasCarnetBytes,
                              byte[] fotoFrenteDniBytes,
                              byte[] fotoAtrasDniBytes);
}
