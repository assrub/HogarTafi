package com.hogarTafi.hogarTafi.stock.servicio.implement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.paciente.repositorio.RPaciente;
import com.hogarTafi.hogarTafi.stock.Entidad.EArregloStock;
import com.hogarTafi.hogarTafi.stock.Entidad.EStock;
import com.hogarTafi.hogarTafi.stock.repositorio.RStock;
import com.hogarTafi.hogarTafi.stock.servicio.StockService;

@Service
public class StockServiceImpl implements StockService {
    
    @Autowired
    private RStock repositorioStock;
    
    @Autowired
    private RPaciente repositorioPacientes;

    public boolean registrarStock(Integer dni, List<EStock> stockRequestList) {

        // Verificar si el paciente está registrado en la base de datos de pacientes
        if (!repositorioPacientes.findByDni(dni).isPresent()) {
            return false; // El paciente no está registrado
        }
    
        // Buscar si ya existe un documento de stock para el paciente
        Optional<EArregloStock> stockPaciente = repositorioStock.findByDni(dni);
    
        EArregloStock stockArray;
    
        if (stockPaciente.isPresent()) {
            // Si ya existe un documento de stock, lo usamos
            stockArray = stockPaciente.get();
    
            // Limpiar la lista de medicamentos antes de agregar los nuevos
            stockArray.getMedicamentos().clear();
        } else {
            // Si no existe, creamos un nuevo documento de medicación
            stockArray = new EArregloStock();
            stockArray.setDni(dni); // Establecer el DNI como clave primaria
        }
    
        // Recorrer cada objeto stock de la lista stockRequestList
        for (EStock stockRequest : stockRequestList) {
            
            EStock stock = new EStock();
    
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
    
    public EArregloStock buscarStockPorDni(Integer dni) {
        return repositorioStock.findByDni(dni).orElse(null);  // Devuelve null si no se encuentra medicación
    }

    
    public List<EArregloStock> buscarStock(){
        return repositorioStock.findAll(); // Devuelve la primera medicación registrada en la base de datos
    }

}
