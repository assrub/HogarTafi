package com.hogarTafi.hogarTafi.medicamento.controlador;

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

import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicacion;
import com.hogarTafi.hogarTafi.medicamento.entidad.EMedicamento;
import com.hogarTafi.hogarTafi.medicamento.servicio.implement.MedicamentoServiceImpl;



@RestController
@RequestMapping("/medicamento")
public  class CMedicamento{
    @Autowired
    private MedicamentoServiceImpl medicamentoService;

    @PostMapping("/{dni}")
    public ResponseEntity<Map<String, String>> registrarMedicamento(@PathVariable("dni") Integer dni,
                                                                    @RequestBody List<EMedicamento> medicamentoRequest){
                                                                        

        Map<String, String> response = new HashMap<>();
        try{

            boolean registrado = medicamentoService.registrarMedicamento(dni, medicamentoRequest);
            
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
            EMedicacion medicacion = medicamentoService.buscarMedicacionPorDni(dni);
        
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
        List<EMedicacion> medicacion = medicamentoService.buscarMedicacion();

        return ResponseEntity.ok(medicacion);
    }
    

}