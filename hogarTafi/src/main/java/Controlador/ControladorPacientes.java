package Controlador;

import Entidad.Paciente;
import java.util.List;
import Servicios.ServicioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pacientes")
public class ControladorPacientes {
    @Autowired
    ServicioPacientes servicioPacientes;

    @GetMapping
    public ResponseEntity<List<Paciente>> todosLosPacientes() {
        return ResponseEntity.ok(servicioPacientes.todosLosPacientes());
    }
}
