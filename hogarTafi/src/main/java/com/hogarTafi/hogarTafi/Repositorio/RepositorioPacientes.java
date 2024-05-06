package com.hogarTafi.hogarTafi.Repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hogarTafi.hogarTafi.Entidad.EntidadPaciente;

import java.util.List;

@Repository
public interface RepositorioPacientes extends MongoRepository<EntidadPaciente, String> {
    @Override
    List<EntidadPaciente> findAll();
}