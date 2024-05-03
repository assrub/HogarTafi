package Servicios;

import Entidad.Paciente;
import java.util.List;
import Repositorio.RepositorioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicioPacientes {

    @Autowired
    RepositorioPacientes repositorioPacientes;

    public List<Paciente> todosLosPacientes(){
        return repositorioPacientes.findAll();
    }

}

