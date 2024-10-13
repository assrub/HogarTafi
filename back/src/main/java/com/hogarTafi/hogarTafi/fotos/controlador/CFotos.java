package com.hogarTafi.hogarTafi.fotos.controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.hogarTafi.hogarTafi.fotos.entidad.EFotos;
import com.hogarTafi.hogarTafi.fotos.servicios.implement.SIFotos;

@RestController
@RequestMapping("/api/fotos")
public class CFotos {

    @Autowired
    private SIFotos servicioFotos;

    // 1. POST: Guarda una foto asociada a una lista de DNIs
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> guardarPaciente(@RequestParam("dni") List<Integer> dni,
                                                               @RequestParam("descripcion") String descripcion,
                                                               @RequestParam(value = "foto", required = true) MultipartFile foto) {
        Map<String, String> response = new HashMap<>();
        try {
            byte[] fotoBytes = foto != null ? foto.getBytes() : null;
            // Crea una nueva instancia de EFotos con los datos recibidos
            EFotos fotos = new EFotos();
            fotos.setDni(dni);
            fotos.setDescripcion(descripcion);
            fotos.setFoto(fotoBytes);

            // Guarda la entidad usando el servicio
            boolean guardado = servicioFotos.guardarFotos(fotos, dni);

            if (guardado) {
                response.put("message", "Fotos guardadas correctamente.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "No se pudieron guardar las fotos.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }

        } catch (IllegalArgumentException e) {
            response.put("message", "Los datos proporcionados son inválidos.");
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("message", "Error al procesar la solicitud.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 2. GET: Obtener todas las fotos y sus DNIs asociados
    @GetMapping
    public ResponseEntity<List<EFotos>> obtenerTodasLasFotos() {
        List<EFotos> fotos = servicioFotos.todasLasFotos();
        return ResponseEntity.ok(fotos);
    }

    // 3. GET: Obtener fotos asociadas a un DNI específico
    @GetMapping("/{dni}")
    public ResponseEntity<List<EFotos>> obtenerFotosPorDni(@PathVariable Integer dni) {
        List<EFotos> fotos = servicioFotos.buscarPorDni(dni);
        if (fotos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(fotos);
    }

   // 4. POST: Eliminar un DNI de una foto o la foto completa si solo tiene un DNI
   @DeleteMapping
   public ResponseEntity<Map<String, String>> eliminarDniDeFoto(@RequestParam("dni") Integer dni,
                                                                @RequestParam("fotoId") String fotoId) {
       Map<String, String> response = new HashMap<>();
       try {
           // Llama al servicio para eliminar el DNI de la foto
           boolean eliminado = servicioFotos.eliminarDniDeFoto(dni, fotoId);
   
           if (eliminado) {
               response.put("message", "DNI eliminado de la foto o foto eliminada.");
               return ResponseEntity.ok(response);
           } else {
               response.put("message", "No se pudo eliminar el DNI o la foto.");
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
           }
       } catch (Exception e) {
           response.put("message", "Error al procesar la solicitud.");
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
       }
   }
}
