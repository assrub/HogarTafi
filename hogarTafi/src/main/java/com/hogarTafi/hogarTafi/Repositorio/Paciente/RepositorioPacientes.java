package com.hogarTafi.hogarTafi.Repositorio.Paciente;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.hogarTafi.hogarTafi.Entidad.Paciente.EntidadPaciente;

import java.util.List;

@Repository
public interface RepositorioPacientes extends MongoRepository<EntidadPaciente, String> {
    @Override
    List<EntidadPaciente> findAll();

    EntidadPaciente findByDni(String dni);

    void deleteByDni(String dni);
}