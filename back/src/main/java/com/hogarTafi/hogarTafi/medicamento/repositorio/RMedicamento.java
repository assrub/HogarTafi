package com.hogarTafi.hogarTafi.medicamento.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;

import java.util.List;
import java.util.Optional;

public interface RMedicamento extends MongoRepository<EMedicamento, Integer> {
    @Override
    List<EMedicamento> findAll();

    Optional<EMedicamento> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}
