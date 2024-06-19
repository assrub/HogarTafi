package com.hogarTafi.hogarTafi.Repositorio.Paciente;


import com.hogarTafi.hogarTafi.Entidad.Paciente.EntidadPacienteEliminado;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface RepositorioPacientesEliminados extends MongoRepository<EntidadPacienteEliminado, String> {
    @Override
    List<EntidadPacienteEliminado> findAll();

    EntidadPacienteEliminado findByDni(String dni);

    void deleteByDni(String dni);

}
