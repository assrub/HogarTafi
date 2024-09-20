package com.hogarTafi.hogarTafi.Repositorio;


import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import com.hogarTafi.hogarTafi.Entidad.Medicacion;

public interface RepositorioMedicacion extends MongoRepository<Medicacion, Integer> {
    Optional<Medicacion> findByDni(Integer dni);  // Buscar medicamentos por el DNI del paciente
}
