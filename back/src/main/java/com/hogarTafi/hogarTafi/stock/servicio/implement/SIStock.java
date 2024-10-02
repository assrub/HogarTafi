package com.hogarTafi.hogarTafi.stock.servicio.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.paciente.repositorio.RPaciente;
import com.hogarTafi.hogarTafi.stock.Entidad.EStock;
import com.hogarTafi.hogarTafi.stock.Entidad.EListStock;
import com.hogarTafi.hogarTafi.stock.repositorio.RStock;
import com.hogarTafi.hogarTafi.stock.servicio.SStock;

@Service
public class SIStock implements SStock {
    
    @Autowired
    private RStock repositorioStock;
    
    @Autowired
    private RPaciente repositorioPacientes;

    public boolean registrarStock(Integer dni, List<EListStock> stockRequestList) {

        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }
    
        // Buscar si ya existe un documento de stock para el paciente
        Optional<EStock> stockPaciente = repositorioStock.findByDni(dni);
    
        EStock stockArray;
    
        if (stockPaciente.isPresent()) {
            // Si ya existe un documento de stock, lo usamos
            stockArray = stockPaciente.get();
    
            // Limpiar la lista de medicamentos antes de agregar los nuevos
            stockArray.getMedicamentos().clear();
        } else {
            // Si no existe, creamos un nuevo documento de medicación
            stockArray = new EStock();
            stockArray.setDni(dni); // Establecer el DNI como clave primaria
        }
    
        // Recorrer cada objeto stock de la lista stockRequestList
        for (EListStock stockRequest : stockRequestList) {
            
            EListStock stock = new EListStock();
    
            // Obtener y asignar los valores de cada atributo
            stock.setMedicacion(stockRequest.getMedicacion() != null ? stockRequest.getMedicacion() : null);
            stock.setCantidad(stockRequest.getCantidad() != null ? stockRequest.getCantidad() : null);
            stock.setCant_minima(stockRequest.getCant_minima() != null ? stockRequest.getCant_minima() : null);

            // Agregar cada objeto a la lista de stocks del paciente
            stockArray.getMedicamentos().add(stock);
        }
    
        // Guardar o actualizar el documento de stock con la nueva lista de stocks
        repositorioStock.save(stockArray);
    
        return true; // Stocks registrados con éxito
    }
    
    public EStock buscarStockPorDni(Integer dni) {
        return repositorioStock.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

    
    public List<EStock> buscarStock(){
        return repositorioStock.findAll(); // Devuelve la primera medicación registrada en la base de datos
    }

}
