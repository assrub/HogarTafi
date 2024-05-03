package Entidad;

public class Pedido {
    private Paciente[] paciente;
    private Medicamento[][] medicamentos;

    public Pedido(Paciente[] paciente, Medicamento[][] medicamentos) {
        this.paciente = paciente;
        this.medicamentos = medicamentos;
    }

    public Paciente[] getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente[] paciente) {
        this.paciente = paciente;
    }

    public Medicamento[][] getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(Medicamento[][] medicamentos) {
        this.medicamentos = medicamentos;
    }
}
