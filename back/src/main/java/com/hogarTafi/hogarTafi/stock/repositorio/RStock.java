package com.hogarTafi.hogarTafi.stock.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hogarTafi.hogarTafi.stock.entidad.EStock;

import java.util.List;
import java.util.Optional;

public interface RStock extends MongoRepository<EStock, Integer> {
    @Override
    List<EStock> findAll();
    
    Optional<EStock> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}

