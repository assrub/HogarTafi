import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Boton from "./Boton";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
  };
  

export default function CartelAviso({abrirModal, cerrarModal, mensaje}){
  
    return (
      <div>
        
        <Modal
          open={abrirModal}
          onClose={cerrarModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-xl">
            <div className="mensaje flex justify-center p-4 text-2xl">
            <p>{mensaje}</p>
            </div>
            <div className="boton flex justify-center align-bottom mt-4 pb-2">
                <Boton onClick={cerrarModal} textoBoton="Cerrar"/>
            </div>
            
          </Box>
        </Modal>
      </div>)
}