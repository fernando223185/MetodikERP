import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ReactComponent as SprinterSVG } from '../../../../assets/img/camiones/base-sprinter.svg'; 
import { ReactComponent as AsientoSVG } from '../../../../assets/img/camiones/asiento-camion2.svg'; 

const FormCamion = ({ show, handleClose, totalSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber) 
        : [...prevSelectedSeats, seatNumber] 
    );
  };

  const generateSeatPositions = () => {
    const positions = [];
    let seatCounter = 1;

    for (let i = Math.ceil(totalSeats / 4) - 1; i >= 0; i--) {
      positions.push({
        seatNumber: seatCounter++,
        left: '20%',
        top: `${15 + i * 15}%`, 
      });

      positions.push({
        seatNumber: seatCounter++,
        left: '34%',
        top: `${15 + i * 15}%`,  
      });

      positions.push({ isAisle: true });

      positions.push({
        seatNumber: seatCounter++,
        left: '56%', 
        top: `${15 + i * 15}%`,  
      });

      positions.push({
        seatNumber: seatCounter++,
        left: '70%',
        top: `${15 + i * 15}%`,  
      });

      if (seatCounter > totalSeats) break;
    }
    return positions;
  };

  const seatPositions = generateSeatPositions();

  const renderSeats = () => {
    return seatPositions.map((pos, index) => {
      if (pos.isAisle) {
        return (
          <div
            key={`aisle-${index}`}
            style={{
              width: '30px',  
              display: 'inline-block',
            }}
          />
        );
      }

      const isSelected = selectedSeats.includes(pos.seatNumber);

      return (
        <div
          key={pos.seatNumber}
          onClick={() => handleSeatClick(pos.seatNumber)}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            width: '60px', // Ajusta el tamaño del contenedor del asiento
            height: '50px', // Ajusta la altura del contenedor del asiento
            cursor: 'pointer',
            backgroundColor: isSelected ? '#A66595' : 'lightgray', // Cambia el color de fondo según si está seleccionado
            borderRadius: '5px', // Le da un poco de estilo
            padding: '2px', // Reduce el espacio alrededor del icono del asiento
          }}
        >
          <AsientoSVG
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          {/* Número del asiento centrado */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black', // Color del número
              fontWeight: 'bold',
              fontSize: '14px', // Ajusta el tamaño del número
            }}
          >
            {pos.seatNumber}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona tus asientos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ position: 'relative', width: '100%', height: '600px' }}>
          {/* SVG del camión */}
          <SprinterSVG style={{ width: '100%', height: '100%' }} />
          
          {/* Contenedor para los asientos */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '10%', // Control vertical del grupo de asientos
              left: '15%', // Control horizontal del grupo de asientos
              width: '70%',  // Controla la anchura del área donde se distribuyen los asientos
              height: '80%', // Controla la altura del área donde se distribuyen los asientos
              display: 'relative'
            }}
          >
            {renderSeats()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => console.log(selectedSeats)}>
          Confirmar
        </Button>
      </Modal.Footer>
      </>
  );
};

export default FormCamion;
