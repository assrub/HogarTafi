package com.hogarTafi.hogarTafi.usuario.entidad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ELogin {
    private String nombreUsuario;
    private String password;

    }
