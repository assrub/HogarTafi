package com.hogarTafi.hogarTafi.Entidad;

import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Pacientes")
public class EntidadPaciente {
    private String nombre;
    private String apellido;
    private String dni;
    private String obraSocial;
    private String[] fotoCarnet; // Buscar algun tipo para poder usar imagenes
    private String[] fotoDni; // Buscar algun tipo para poder usar imagenes

    public EntidadPaciente(String nombre, String apellido, String dni, String obraSocial, String[] fotoCarnet, String[] fotoDni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.fotoCarnet = fotoCarnet;
        this.fotoDni = fotoDni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getObraSocial() {
        return obraSocial;
    }

    public void setObraSocial(String obraSocial) {
        this.obraSocial = obraSocial;
    }

    public String[] getFotoCarnet() {
        return fotoCarnet;
    }

    public void setFotoCarnet(String[] fotoCarnet) {
        this.fotoCarnet = fotoCarnet;
    }

    public String[] getFotoDni() {
        return fotoDni;
    }

    public void setFotoDni(String[] fotoDni) {
        this.fotoDni = fotoDni;
    }
}