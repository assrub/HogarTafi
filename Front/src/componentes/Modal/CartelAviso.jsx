import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Boton from "./../Botones/Boton";

// Estilo del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  padding: "20px",
  textAlign: "center",
};

// Función para decidir el ícono y el color según el estado
// ESTADOS: 1 Exclamación, 2 Correcto, 3 Error, 4 Información 
const getIconAndColor = (estado) => {
  switch (estado) {
    case 1:
      return { icono: <ErrorOutlineIcon style={{ fontSize: 60, color: "yellow" }} />, color: "yellow" };
    case 2:
      return { icono: <CheckCircleOutlineIcon style={{ fontSize: 60, color: "green" }} />, color: "green" };
    case 3:
      return { icono: <HighlightOffIcon style={{ fontSize: 60, color: "red" }} />, color: "red" };
    case 4:
      return { icono: <InfoOutlinedIcon style={{ fontSize: 60, color: "blue" }} />, color: "blue" };
    default:
      return { icono: <InfoOutlinedIcon style={{ fontSize: 60, color: "gray" }} />, color: "gray" }; // Estado por defecto
  }
};

export default function CartelAviso({ abrirModal, cerrarModal, mensaje, estado, onConfirm }) {
  const { icono } = getIconAndColor(estado); // Obtiene el ícono según el estado

  // Verifica si debe ser un mensaje de confirmación
  const isConfirm = estado > 10 && estado < 20 && onConfirm;

  return (
    <Modal
      open={abrirModal}
      onClose={cerrarModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-xl">
        {/* Ícono dinámico según el estado */}
        <div className="icono flex justify-center mb-4">{icono}</div>

        {/* Mensaje recibido */}
        <div className="mensaje flex justify-center p-4 text-2xl">
          <p>{mensaje}</p>
        </div>

        {/* Botones de confirmación o cierre */}
        <div className="boton flex justify-end mt-4">
          {isConfirm ? (
            <>
              <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onConfirm}>
                Confirmar
              </button>
            </>
          ) : (
            <Boton onClick={cerrarModal} textoBoton="Cerrar" />
          )}
        </div>
      </Box>
    </Modal>
  );
}
