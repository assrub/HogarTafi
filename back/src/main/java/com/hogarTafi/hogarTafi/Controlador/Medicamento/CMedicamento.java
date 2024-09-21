package com.hogarTafi.hogarTafi.Controlador.Medicamento;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.hogarTafi.hogarTafi.Entidad.Medicamento.EMedicacion;
import com.hogarTafi.hogarTafi.Entidad.Medicamento.EMedicamento;
import com.hogarTafi.hogarTafi.Servicio.Medicamento.SMedicamento;

@RestController
@RequestMapping("/medicamento")
public  class CMedicamento{
    @Autowired
    private SMedicamento servicioMedicamento;

    @PostMapping("/{dni}")
    public ResponseEntity<Map<String, String>> registrarMedicamento(@PathVariable("dni") Integer dni,
                                                                    @RequestBody EMedicamento medicamentoRequest){

        Map<String, String> response = new HashMap<>();
        try{
            boolean Medicamento = servicioMedicamento.registrarMedicamento( dni,
                                                                            medicamentoRequest.getMedicamento(),
                                                                            medicamentoRequest.getHorario_1(),
                                                                            medicamentoRequest.getDesayuno(),
                                                                            medicamentoRequest.getAlmuerzo(),
                                                                            medicamentoRequest.getMerienda(),
                                                                            medicamentoRequest.getCena(),
                                                                            medicamentoRequest.getHorario_2(),
                                                                            medicamentoRequest.getObservaciones());

            
            System.out.println(medicamentoRequest.getMedicamento());
            System.out.println(medicamentoRequest.getHorario_1());
            System.out.println(medicamentoRequest.getDesayuno());
            System.out.println(medicamentoRequest.getAlmuerzo());
            System.out.println(medicamentoRequest.getMerienda());
            System.out.println(medicamentoRequest.getCena());
            System.out.println(medicamentoRequest.getHorario_2());
            System.out.println(medicamentoRequest.getObservaciones());
            
            if (Medicamento){
                response.put("message", "El medicamento se ha registrado.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "ERROR 2 - al guardar el medicamento.");
                return ResponseEntity.badRequest().body(response);
            }
        }
        catch (Exception e)
        {
            response.put("message", "ERROR 1 - al guardar el medicamento.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }                                                                        
    }

    @GetMapping("/{dni}")
    public ResponseEntity<?> obtenerMedicamentosPorDni(@PathVariable("dni") Integer dni) {
        try {
            // Buscar la medicación por DNI usando el servicio
            EMedicacion medicacion = servicioMedicamento.buscarMedicacionPorDni(dni);
        
            if (medicacion == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron medicamentos para el DNI: " + dni);
            }
        
            // Devolver los medicamentos en formato JSON
            return ResponseEntity.ok(medicacion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }
}