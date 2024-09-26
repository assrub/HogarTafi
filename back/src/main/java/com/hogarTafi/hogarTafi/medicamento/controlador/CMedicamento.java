package com.hogarTafi.hogarTafi.medicamento.controlador;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;
import com.hogarTafi.hogarTafi.medicamento.entidad.EListMedicamento;
import com.hogarTafi.hogarTafi.medicamento.servicio.implement.SIMedicamento;



@RestController
@RequestMapping("/medicamento")
public  class CMedicamento{
    @Autowired
    private SIMedicamento medicamentoService;

    @PostMapping("/{dni}")
    public ResponseEntity<Map<String, String>> registrarMedicamento(@PathVariable("dni") Integer dni,
                                                                    @RequestBody List<Map<String, Object>> medicamentosRequest){


        List<EListMedicamento> listaMedicamentos = new ArrayList<>();

        for (Map<String, Object> map : medicamentosRequest) {
            EListMedicamento medicamento = new EListMedicamento();


            medicamento.setMedicamento((String) map.get("Medicamento"));
            medicamento.setHorario_1((String) map.get("6:00"));
            medicamento.setDesayuno((String) map.get("Desayuno"));
            medicamento.setAlmuerzo((String) map.get("Almuerzo"));
            medicamento.setMerienda((String) map.get("Merienda"));
            medicamento.setCena((String) map.get("Cena"));
            medicamento.setHorario_2((String) map.get("22:30"));
            medicamento.setObservaciones((String) map.get("Observaciones"));


            listaMedicamentos.add(medicamento);
        }

        System.out.println(listaMedicamentos);
        Map<String, String> response = new HashMap<>();
       try{

            boolean registrado = medicamentoService.registrarMedicamento(dni, listaMedicamentos);
            
           if (registrado){
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
            EMedicamento medicacion = medicamentoService.buscarMedicacionPorDni(dni);
        
            if (medicacion == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron medicamentos para el DNI: " + dni);
            }
        
            // Devolver los medicamentos en formato JSON
            return ResponseEntity.ok(medicacion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> getMethodName() {
        List<EMedicamento> medicacion = medicamentoService.buscarMedicacion();

        return ResponseEntity.ok(medicacion);
    }
    

}