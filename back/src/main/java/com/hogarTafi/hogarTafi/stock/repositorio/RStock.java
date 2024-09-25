package com.hogarTafi.hogarTafi.stock.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hogarTafi.hogarTafi.stock.Entidad.EArregloStock;

import java.util.List;
import java.util.Optional;

public interface RStock extends MongoRepository<EArregloStock, Integer> {
    @Override
    List<EArregloStock> findAll();
    
    Optional<EArregloStock> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}

