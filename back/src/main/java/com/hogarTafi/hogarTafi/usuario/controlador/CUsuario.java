package com.hogarTafi.hogarTafi.usuario.controlador;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.hogarTafi.hogarTafi.usuario.servicio.SUsuario;
import com.hogarTafi.hogarTafi.usuario.entidad.EUsuario;

@RestController
@RequestMapping("/usuarios")
public class CUsuario {
    @Autowired
    private SUsuario usuarioService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> TodosLosUsuarios() {
        List<Map<String, Object>> usuariosConFotos = usuarioService.obtenerUsuariosConFotos();
        return ResponseEntity.ok(usuariosConFotos);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> registrarUsuario(@RequestParam("dni") Integer dni,
                                                                @RequestParam("nombre") String nombre,
                                                                @RequestParam("apellido") String apellido,
                                                                @RequestParam("email") String email,
                                                                @RequestParam("telefono") String telefono,
                                                                @RequestParam("direccion") String direccion,
                                                                @RequestParam("asociado") Integer asociado,
                                                                @RequestParam("tipo") String tipo,
                                                                @RequestParam("user_id") String user_id,
                                                                @RequestParam("password") String password,               
                                                                @RequestParam(value = "fotoCarnet", required = false) MultipartFile fotoCarnet
    ){
        Map<String, String> response = new HashMap<>();
        try {
            //crear instancia de EUsuario y asignar valores
            EUsuario usuario = new EUsuario();
            usuario.setDni(dni);
            usuario.setActivo(true);
            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
            usuario.setEmail(email);
            usuario.setTelefono(telefono);
            usuario.setDireccion(direccion);
            usuario.setAsociado(asociado);
            usuario.setTipo(tipo);
            usuario.setUser_id(user_id);
            usuario.setPassword(password);

            if (fotoCarnet != null && !fotoCarnet.isEmpty())
            {
                usuario.setFotoCarnet(fotoCarnet.getBytes());
            }

            if (usuarioService.guardarUsuario(usuario))
            {
                response.put("message", "Usuario registrado.");
                return ResponseEntity.ok(response);
            }else
            {
                response.put("message", "El usuario ya está registrado.");
                return ResponseEntity.badRequest().body(response);
            }

        } catch (IOException e) {
            response.put("message", "Error al procesar las imágenes.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
       
        }

    }

    @PatchMapping("/modificar/{dni}")
    public ResponseEntity<Map<String, String>> modificarUsuario(@PathVariable Integer dni,
                                                                @RequestParam(value = "nombre", required = false) String nombre,
                                                                @RequestParam(value = "apellido", required = false) String apellido,
                                                                @RequestParam(value = "email", required = false) String email,
                                                                @RequestParam(value = "telefono", required = false) String telefono,
                                                                @RequestParam(value = "direccion", required = false) String direccion,
                                                                @RequestParam(value = "asociado", required = false) Integer asociado,
                                                                @RequestParam(value = "tipo", required = false) String tipo,
                                                                @RequestParam(value = "user_id", required = false) String user_id,
                                                                @RequestParam(value = "password", required = false) String password,
                                                                @RequestParam(value = "fotoCarnet", required = false) MultipartFile fotoCarnet
    ) {
        Map<String, String> response = new HashMap<>();
        try{
            
            EUsuario usuario = new EUsuario();
            
            usuario.setDni(dni);
            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
            usuario.setEmail(email);
            usuario.setTelefono(telefono);
            usuario.setDireccion(direccion);
            usuario.setAsociado(asociado);
            usuario.setTipo(tipo);
            usuario.setUser_id(user_id);
            usuario.setPassword(password);

            
            boolean actualizar = usuarioService.actualizarUsuario(usuario);
            if (actualizar) {
                response.put("message", "Usuario actualizado correctamente.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "No se pudo actualizar el Usuario.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch(Exception e)
        {
            response.put("message", "Error al procesar la solicitud.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Integer dni) {
        EUsuario usuario = usuarioService.buscarUsuarioPorDni(dni);
        if (usuario == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario no encontrado.");
            return ResponseEntity.badRequest().body(response);
        } else {
            return ResponseEntity.ok(usuario);
        }
    }

    @PatchMapping("/desactivar/{dni}")
    public ResponseEntity<Map<String, String>> desactivarUsuario(@PathVariable Integer dni) {
        Map<String, String> response = new HashMap<>();
        try {
            usuarioService.desactivarUsuario(dni);
            response.put("message", "Usuario desactivado.");
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (IllegalArgumentException e) {
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("message", "Error al desactivar el Usuario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }  
}