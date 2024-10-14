package com.hogarTafi.hogarTafi.stock.controlador;
import org.springframework.web.bind.annotation.*;

import com.hogarTafi.hogarTafi.stock.entidad.EStock;
import com.hogarTafi.hogarTafi.stock.entidad.EListStock;
import com.hogarTafi.hogarTafi.stock.servicio.implement.SIStock;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/stock")
public class CStock {

    
    @Autowired
    private SIStock stockService;

     @PostMapping("/{dni}")
    public ResponseEntity<Map<String, String>> registrarMedicamento(@PathVariable("dni") Integer dni,
                                                                    @RequestBody List<Map<String, Object>> stockRequest){

        List<EListStock> listaStock = new ArrayList<>();

        for (Map<String, Object> map : stockRequest) {

            EListStock MStock = new EListStock();

            MStock.setMedicacion((String) map.get("medicacion"));
            MStock.setCantidad((String) map.get("cantidad"));
            MStock.setCant_minima((String) map.get("cant_minima"));

            listaStock.add(MStock);
        }

        
        System.out.println(listaStock);

        Map<String, String> response = new HashMap<>();
        
        try{

            boolean registrado = stockService.registrarStock(dni, listaStock);
            
           if (registrado){
                response.put("message", "El stock se ha registrado.");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "ERROR 2 - al guardar el stock.");
                return ResponseEntity.badRequest().body(response);
            }
        }
        catch (Exception e)
        {
            response.put("message", "ERROR 1 - al guardar el stock.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    
    @GetMapping("/{dni}")
    public ResponseEntity<?> obtenerMedicamentosPorDni(@PathVariable("dni") Integer dni) {
        try {
            // Buscar la medicación por DNI usando el servicio
            EStock arregloStock = stockService.buscarStockPorDni(dni);
        
            if (arregloStock == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron stocks para el DNI: " + dni);
            }
        
            // Devolver los medicamentos en formato JSON
            return ResponseEntity.ok(arregloStock);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor.");
        }
    }
 
    @PatchMapping("/{dni}")
    public ResponseEntity<?> actualizarCantidadMedicamentosDni(
        @PathVariable Integer dni,
        @RequestParam("restar") Integer restar,
        @RequestParam("sumar") Integer sumar,
        @RequestParam("medicamento") String medicamento) {
    
        try {

            // Validar que las cantidades sean >= 0
            if (restar < 0 || sumar < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Las cantidades mínima y máxima deben ser >= 0.");
            }
    
            // Llamar al servicio para actualizar el stock
            boolean actualizado = stockService.actualizarCantidadMedicamentos(dni, restar, sumar, medicamento);
    
            if (!actualizado) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró stock para el DNI o el medicamento no está registrado.");
            }
    
            return ResponseEntity.ok("Stock actualizado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al actualizar el stock.");
        }
    }
    
    

    @GetMapping("/todosLosStocks")
    public ResponseEntity<?> tododsLosStocks() {
        List<EStock> listaDeStocks = stockService.buscarStock();
        return ResponseEntity.ok(listaDeStocks);
    }



}
