package com.hogarTafi.hogarTafi.usuario.entidad;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Usuarios")
public class EUsuario {
    @Id
    private Integer dni;

    private String nombre;

    private String apellido;
    private Boolean activo;
    private String email;
    private String telefono;
    private String direccion;
    private String asociado;
    private String tipo;

    private String password;
    private byte[] fotoCarnet;
}