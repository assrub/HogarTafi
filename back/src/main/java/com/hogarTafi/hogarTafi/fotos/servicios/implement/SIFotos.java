package com.hogarTafi.hogarTafi.fotos.servicios.implement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hogarTafi.hogarTafi.fotos.entidad.EFotos;
import com.hogarTafi.hogarTafi.fotos.repositorio.RFotos;
import com.hogarTafi.hogarTafi.fotos.servicios.SFotos;
import com.hogarTafi.hogarTafi.paciente.entidad.EPaciente;
import com.hogarTafi.hogarTafi.paciente.repositorio.RPaciente;

@Service
public class SIFotos implements SFotos {

    @Autowired
    private RFotos repositorioFotos;

    @Autowired
    private RPaciente repositorioPacientes;

    @Override
    public List<EFotos> todasLasFotos() {
        return repositorioFotos.findAll();  // Ya retorna el ID implícitamente al ser parte de la entidad EFotos
    }

    @Override
    public boolean guardarFotos(EFotos fotos, List<Integer> dniList) {
        try {
            // Verificar que los DNI existen en la base de datos
            List<Integer> dniValidos = verificarDniExistentes(dniList);
            if (!dniValidos.isEmpty()) {
                fotos.setDni(dniValidos); // Asocia solo los DNI válidos a la foto
                repositorioFotos.save(fotos); // Guarda la entidad EFotos en la base de datos
                return true;
            } else {
                return false; // No se guardó porque no hay DNI válidos
            }
        } catch (Exception e) {
            return false;
        }
    }

    private List<Integer> verificarDniExistentes(List<Integer> dniList) {
        List<Integer> dniValidos = new ArrayList<>();
        for (Integer dni : dniList) {
            Optional<EPaciente> pacienteOptional = repositorioPacientes.findByDni(dni);
            if (pacienteOptional.isPresent()) {
                dniValidos.add(dni); // Agrega el DNI a la lista si existe
            }
        }
        return dniValidos; // Retorna la lista de DNI válidos
    }

    @Override
    public List<EFotos> buscarPorDni(Integer dni) {
        return repositorioFotos.findByDniIn(List.of(dni));
    }

    @Override
    public boolean eliminarDniDeFoto(Integer dni, String fotoId) {
        // Buscar la foto por ID en lugar de por contenido
        Optional<EFotos> fotoOptional = repositorioFotos.findById(fotoId);
    
        if (fotoOptional.isPresent()) {
            EFotos foto = fotoOptional.get();
            List<Integer> dniList = foto.getDni();
    
            if (dniList.contains(dni)) {
                if (dniList.size() == 1) {
                    // Si solo queda un DNI asociado, elimina la foto completa
                    repositorioFotos.delete(foto);
                } else {
                    // Si hay más de un DNI, simplemente elimina ese DNI de la lista
                    dniList.remove(dni);
                    foto.setDni(dniList);
                    repositorioFotos.save(foto);
                }
                return true;
            }
        }
        return false;
    }

    @Override
    public EFotos buscarPorContenido(byte[] fotoBytes) {
        List<EFotos> todasLasFotos = repositorioFotos.findAll();

        for (EFotos foto : todasLasFotos) {
            if (Arrays.equals(foto.getFoto(), fotoBytes)) {
                return foto; // Retorna la foto que coincide
            }
        }
        return null; // Si no se encuentra ninguna coincidencia
    }
}
