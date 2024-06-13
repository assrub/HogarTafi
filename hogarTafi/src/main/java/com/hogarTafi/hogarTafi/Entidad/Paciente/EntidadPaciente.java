package com.hogarTafi.hogarTafi.Entidad.Paciente;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Pacientes")
public class EntidadPaciente {
    private String nombre;
    private String apellido;
    private String dni;
    private String obraSocial;

    private byte[] fotoFrenteCarnet; // Buscar algun tipo para poder usar imagenes

    private byte[] fotoAtrasCarnet;

    private byte[] fotoFrenteDni;// Buscar algun tipo para poder usar imagenes

    private byte[] fotoAtrasDni;

    public EntidadPaciente(String nombre, String apellido, String dni, String obraSocial, byte[] fotoFrenteCarnet,
                           byte[] fotoAtrasCarnet, byte[] fotoFrenteDni, byte[] fotoAtrasDni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.fotoFrenteCarnet = fotoFrenteCarnet;
        this.fotoAtrasCarnet = fotoAtrasCarnet;
        this.fotoFrenteDni = fotoFrenteDni;
        this.fotoAtrasDni = fotoAtrasDni;
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

    public byte[] getFotoFrenteCarnet() {
        return fotoFrenteCarnet;
    }

    public void setFotoFrenteCarnet(byte[] fotoFrenteCarnet) {
        this.fotoFrenteCarnet = fotoFrenteCarnet;
    }

    public byte[] getFotoFrenteDni() {
        return fotoFrenteDni;
    }

    public void setFotoFrenteDni(byte[] fotoFrenteDni) {
        this.fotoFrenteDni = fotoFrenteDni;
    }

    public byte[] getFotoAtrasCarnet() {
        return fotoAtrasCarnet;
    }

    public void setFotoAtrasCarnet(byte[] fotoAtrasCarnet) {
        this.fotoAtrasCarnet = fotoAtrasCarnet;
    }

    public byte[] getFotoAtrasDni() {
        return fotoAtrasDni;
    }

    public void setFotoAtrasDni(byte[] fotoAtrasDni) {
        this.fotoAtrasDni = fotoAtrasDni;
    }
}