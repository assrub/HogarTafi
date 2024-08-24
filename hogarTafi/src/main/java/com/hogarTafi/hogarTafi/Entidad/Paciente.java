package com.hogarTafi.hogarTafi.Entidad;

import lombok.*;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Pacientes")
public class Paciente {
    private String nombre;
    private String apellido;
    private Integer dni;
    private String obraSocial;
    private Boolean activo;
    private String observaciones;

    private byte[] fotoFrenteCarnet; // Buscar algun tipo para poder usar imagenes

    private byte[] fotoAtrasCarnet;

    private byte[] fotoFrenteDni;// Buscar algun tipo para poder usar imagenes

    private byte[] fotoAtrasDni;


}