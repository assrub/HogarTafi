package Repositorio;

import Entidad.Paciente;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioPacientes extends MongoRepository<Paciente, String> {
    List<Paciente> findAll();
}
