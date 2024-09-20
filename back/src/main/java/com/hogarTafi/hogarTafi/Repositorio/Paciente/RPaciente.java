package com.hogarTafi.hogarTafi.Repositorio.Paciente;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hogarTafi.hogarTafi.Entidad.Paciente.EPaciente;

import java.util.List;
import java.util.Optional;

@Repository
public interface RPaciente extends MongoRepository<EPaciente, Integer> {
    @Override
    List<EPaciente> findAll();

    Optional<EPaciente> findByDni(Integer dni);
}
