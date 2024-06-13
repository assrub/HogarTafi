package com.hogarTafi.hogarTafi.Entidad.Medicacion;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Medicacion")
public class EntidadMedicacion {
    private String nombre;
    private int cantPorMEs;
    private int cantActual;
    private int aviso;

    public EntidadMedicacion(String nombre, int cantPorMEs, int cantActual, int aviso) {
        this.nombre = nombre;
        this.cantPorMEs = cantPorMEs;
        this.cantActual = cantActual;
        this.aviso = aviso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCantPorMEs() {
        return cantPorMEs;
    }

    public void setCantPorMEs(int cantPorMEs) {
        this.cantPorMEs = cantPorMEs;
    }

    public int getCantActual() {
        return cantActual;
    }

    public void setCantActual(int cantActual) {
        this.cantActual = cantActual;
    }

    public int getAviso() {
        return aviso;
    }

    public void setAviso(int aviso) {
        this.aviso = aviso;
    }
}
