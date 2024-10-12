package com.hogarTafi.hogarTafi.fotos.servicios;

import java.util.List;

import com.hogarTafi.hogarTafi.fotos.entidad.EFotos;

public interface SFotos {
    // Método para obtener todas las fotos
    List<EFotos> todasLasFotos();
    
    // Método para guardar una foto, ahora aceptando una lista de DNI
    boolean guardarFotos(EFotos fotos, List<Integer> dniList);
    
    // Método para buscar fotos por un DNI específico
    List<EFotos> buscarPorDni(Integer dni);
    
    // Método para eliminar un DNI de una foto o borrar la foto si es el único DNI
    boolean eliminarDniDeFoto(Integer dni, String fotoId);

    EFotos buscarPorContenido(byte[] fotoBytes);
}
