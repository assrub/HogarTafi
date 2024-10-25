package com.hogarTafi.hogarTafi.fotos.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.hogarTafi.hogarTafi.fotos.entidad.EFotos;
import java.util.List;

public interface RFotos extends MongoRepository<EFotos, String> {
    List<EFotos> findByDniIn(List<Integer> dni);  // Buscar todas las fotos asociadas a varios DNI

}
