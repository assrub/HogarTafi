package com.hogarTafi.hogarTafi.usuario.servicio.implement;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;
import com.hogarTafi.hogarTafi.usuario.repositorio.RUsuario;
import com.hogarTafi.hogarTafi.usuario.servicio.SUsuario;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class SIUsuario implements SUsuario{
    
    @Autowired
    private RUsuario repositorioUsuario;

    @Autowired
    public List<EUsuario> todosLosUsuarios(){
        return repositorioUsuario.findUsuariosConCampos();

    }

    @Override
    public boolean guardarUsuario(EUsuario usuarioDtos) {
        // Verificar si el usuario ya existe
        if (repositorioUsuario.findByDni(usuarioDtos.getDni()).isPresent()) {
            return false; // El usuario ya está registrado
        }

        // Hashear la contraseña antes de guardar
        String hashedPassword = BCrypt.hashpw(usuarioDtos.getPassword(), BCrypt.gensalt());
        usuarioDtos.setPassword(hashedPassword); // Establecer la contraseña hasheada

        repositorioUsuario.save(usuarioDtos);
        return true; // Usuario registrado con éxito
    }

    @Override
    public EUsuario buscarUsuarioPorDni(Integer dni) {
        return repositorioUsuario.findByDni(dni).orElseThrow(() -> new NoSuchElementException("Usuario con el DNI " + dni + " no se encontró."));
    }

    @Override
    public EUsuario buscarPorEmail(String email) {
        return repositorioUsuario.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Usuario con el email " + email + " no se encontró."));
    }
    @Override
    public EUsuario iniciarSesion(String nombreDeUsuario, String password) {
        EUsuario usuario = null;

        // Intentar iniciar sesión con DNI (asumiendo que el DNI es un número)
        if (nombreDeUsuario.matches("\\d+")) { // Verifica si solo contiene dígitos
            try {
                int dni = Integer.parseInt(nombreDeUsuario);
                usuario = buscarUsuarioPorDni(dni);
                if (usuario != null && BCrypt.checkpw(password, usuario.getPassword())) {
                    return usuario; // La contraseña es correcta
                }
            } catch (NumberFormatException e) {
                System.out.println("Error al convertir DNI a número: " + e.getMessage());
            }
        } else {
            System.out.println("El nombre de usuario no es un DNI, intentando con email");
        }

        // Intentar iniciar sesión con email si no es un DNI
        usuario = buscarPorEmail(nombreDeUsuario);
        if (usuario != null && BCrypt.checkpw(password, usuario.getPassword())) {
            return usuario; // La contraseña es correcta
        }

        // Si ninguna de las dos formas funciona, retorna null
        return null;
    }



    @Override
    public boolean actualizarUsuario(EUsuario usuarioDtos) {
        // Obtener el usuario existente
        try{
            EUsuario usuario = repositorioUsuario.findByDni(usuarioDtos.getDni()).orElseThrow(() -> new NoSuchElementException("Usuario no encontrado."));

            // Actualizar los datos del usuario
            usuario.setNombre(usuarioDtos.getNombre());
            usuario.setApellido(usuarioDtos.getApellido());
            usuario.setEmail(usuarioDtos.getEmail());
            usuario.setTelefono(usuarioDtos.getTelefono());
            usuario.setDireccion(usuarioDtos.getDireccion());
            usuario.setAsociado(usuarioDtos.getAsociado());
            usuario.setTipo(usuarioDtos.getTipo());

            usuario.setPassword(usuarioDtos.getPassword());
            usuario.setFotoCarnet(usuarioDtos.getFotoCarnet());

            // Guardar los cambios en la base de datos
            repositorioUsuario.save(usuario);
            return true; // Usuario actualizado con éxito
        }catch (Error error){
            System.out.println(error);
            return false;
        }
    }

    @Override
    public boolean desactivarUsuario(Integer dni) {
        // Obtener el usuario existente
        EUsuario usuario = buscarUsuarioPorDni(dni);
        
        // Verificar si el paciente ya está oculto
        if (!usuario.getActivo()) {
            throw new IllegalArgumentException("El usuario ya está oculto.");
        }else{
            // Si el paciente está activo, se desactiva
            usuario.setActivo(false);
            repositorioUsuario.save(usuario);
            return true; // Usuario desactivado con éxito
        }
    }

    @Override
    public String convertirABase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    @Override
    public List<Map<String, Object>> obtenerUsuariosConFotos() {
        // Obtener todos los usuarios
        List<EUsuario> usuarios = todosLosUsuarios();

        return usuarios.stream().map(usuario -> {

            Map<String, Object> usuarioMap = new HashMap<>();

                usuarioMap.put("dni", usuario.getDni());
                usuarioMap.put("activo",usuario.getActivo());
                usuarioMap.put("nombre", usuario.getNombre());
                usuarioMap.put("apellido", usuario.getApellido());
                usuarioMap.put("email", usuario.getEmail());
                usuarioMap.put("telefono", usuario.getTelefono());
                usuarioMap.put("direccion", usuario.getDireccion());
                usuarioMap.put("asociado", usuario.getAsociado());
                usuarioMap.put("tipo", usuario.getTipo());

                usuarioMap.put("password", usuario.getPassword());
                
                if (usuario.getFotoCarnet()!= null) {
                    usuarioMap.put("fotoCarnet", convertirABase64(usuario.getFotoCarnet()));
                }


            return usuarioMap;
        }).collect(Collectors.toList());
    }
}
