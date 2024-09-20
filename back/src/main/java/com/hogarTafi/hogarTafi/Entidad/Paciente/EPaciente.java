package com.hogarTafi.hogarTafi.Entidad.Paciente;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Pacientes")
public class EPaciente {
    @Id
    private Integer dni; // Usar el DNI como identificador único (_id)
    private String nombre;
    private String apellido;
    private String obraSocial;
    private Boolean activo;
    private String observaciones;
    
    private byte[] fotoFrenteCarnet;
    private byte[] fotoAtrasCarnet;
    private byte[] fotoFrenteDni;
    private byte[] fotoAtrasDni;
}
