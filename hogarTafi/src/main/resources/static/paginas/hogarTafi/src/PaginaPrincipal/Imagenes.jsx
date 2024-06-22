import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Imagenes.css'
import Boton from '../Boton'
import React, { useRef, useState } from 'react';




const Imagenes = ({ TextoFoto, TextoBoton }) => {
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/300");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Card style={{ width: '18rem' }} className="bg-light">
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title> { TextoFoto } </Card.Title>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
        />
        <Boton TextoBoton={TextoBoton} onClick={handleButtonClick} />
      </Card.Body>
    </Card>
  );
}

export default Imagenes;