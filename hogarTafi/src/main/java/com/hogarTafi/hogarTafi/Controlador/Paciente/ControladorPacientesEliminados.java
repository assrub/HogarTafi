package com.hogarTafi.hogarTafi.Controlador.Paciente;


import com.hogarTafi.hogarTafi.Entidad.Paciente.EntidadPacienteEliminado;
import com.hogarTafi.hogarTafi.Servicio.Paciente.ServicioPacientesEliminados;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientesEliminados")
public class ControladorPacientesEliminados {

    @Autowired
    ServicioPacientesEliminados servicioPacientesEliminados;

    @GetMapping
    public ResponseEntity<List<EntidadPacienteEliminado>> todosLosPacientes(){
        return ResponseEntity.ok(servicioPacientesEliminados.todosLosPacientes());
    }

    @PostMapping("/eliminar/{dni}")
    public ResponseEntity<?> eliminarPaciente(@PathVariable String dni){
        if (servicioPacientesEliminados.eliminarPaciente(dni) == true){
            return ResponseEntity.ok("Paciente eliminado.");
        }else{
            return ResponseEntity.badRequest().body("Error al eliminar al paciente");
        }
    }
}