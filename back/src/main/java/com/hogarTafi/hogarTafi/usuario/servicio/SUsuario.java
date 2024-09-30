package com.hogarTafi.hogarTafi.usuario.servicio;

import java.util.List;
import java.util.Map;

import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;

public interface SUsuario {
    List<EUsuario> todosLosUsuarios();
    boolean guardarUsuario(EUsuario usuarioDtos);
    EUsuario buscarUsuarioPorDni(Integer dni);
    boolean actualizarUsuario(EUsuario usuarioDtos);
    boolean desactivarUsuario(Integer dni);
    String convertirABase64(byte[] bytes);
    List<Map<String, Object>> obtenerUsuariosConFotos();
    EUsuario iniciarSesion(String nombreDeUsuario, String password);
    EUsuario buscarPorEmail(String email);
}
