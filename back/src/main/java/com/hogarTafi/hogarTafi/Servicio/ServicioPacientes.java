package com.hogarTafi.hogarTafi.Servicio;

import com.hogarTafi.hogarTafi.Consulta.ActualizarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.GuardarPacienteConsulta;
import com.hogarTafi.hogarTafi.Consulta.OcultarPacienteConsulta;
import com.hogarTafi.hogarTafi.Entidad.Paciente;

import java.util.List;

public interface ServicioPacientes {
    List<Paciente> todosLosPacientes();

    boolean guardarPaciente(Integer dni, String nombre, String apellido, String obraSocial, Boolean activo, String observaciones,
                            byte[] fotoFrenteCarnet, byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni);

    Paciente buscarPaciente(Integer dni);

    boolean desactivarPaciente(OcultarPacienteConsulta consulta);

    boolean modificarPaciente(Integer dni,
                              String nombre,
                              String apellido,
                              String obraSocial,
                              Boolean activo,
                              String observaciones,
                              byte[] fotoFrenteCarnetBytes,
                              byte[] fotoAtrasCarnetBytes,
                              byte[] fotoFrenteDniBytes,
                              byte[] fotoAtrasDniBytes);
}
