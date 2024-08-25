package com.hogarTafi.hogarTafi.Consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarPacienteConsulta {
    private Integer dni;
    private String nombre;
    private String apellido;
    private String obraSocial;
    private String observaciones;

}
