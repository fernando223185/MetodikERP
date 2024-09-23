import React, { useState, useEffect } from 'react';
import { ReactComponent as SprinterSVG } from '../../../../assets/img/camiones/base-sprinter.svg'; 
import { ReactComponent as AsientoSVG } from '../../../../assets/img/camiones/asiento-camion2.svg'; 

const FormCamion = ({ asientos, onConfirm }) => {
  console.log(asientos)
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const initiallySelectedSeats = asientos
      .filter(asiento => asiento.Seleccionado)
      .map(asiento => asiento.Asiento);
    setSelectedSeats(initiallySelectedSeats);
  }, [asientos]);

  useEffect(() => {
    onConfirm(selectedSeats);
  }, [selectedSeats, onConfirm]);

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

    for (let i = Math.ceil(asientos.length / 4) - 1; i >= 0; i--) {
      positions.push({
        seatNumber: seatCounter++,
        left: '28%',
        top: `${5 + i * 7}%`, // Ajusta la posición vertical
      });

      positions.push({
        seatNumber: seatCounter++,
        left: '38%',
        top: `${5 + i * 7}%`, // Ajusta la posición vertical
      });

      positions.push({ isAisle: true });

      positions.push({
        seatNumber: seatCounter++,
        left: '55%', 
        top: `${5 + i * 7}%`, // Ajusta la posición vertical
      });

      positions.push({
        seatNumber: seatCounter++,
        left: '65%',
        top: `${5 + i * 7}%`, // Ajusta la posición vertical
      });

      if (seatCounter > asientos.length) break;
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
              width: '20px',  
              display: 'inline-block',
            }}
          />
        );
      }

      const asiento = asientos.find(a => a.Asiento === pos.seatNumber);
      const isSelected = selectedSeats.includes(pos.seatNumber);
      const isReserved = asiento ? asiento.Reservado : false;
      return (
        <div
          key={pos.seatNumber}
          onClick={() => !isReserved && handleSeatClick(pos.seatNumber)}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            width: '45px',  // Reduce el tamaño del asiento
            height: '35px', // Reduce el tamaño del asiento
            cursor: isReserved ? 'not-allowed' : 'pointer',
            backgroundColor: isReserved ? 'darkgray' : (isSelected ? '#A66595' : 'transparent'), 
            borderRadius: '5px', 
            padding: '2px',
            opacity: isReserved ? 0.6 : 1,  
          }}
        >
          <AsientoSVG
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '12px', 
            }}
          >
            {pos.seatNumber}
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}> 
      <SprinterSVG style={{ width: '100%', height: '100%' }} />
      <div 
        style={{ 
          position: 'absolute', 
          top: '1%',  
          left: '15%', 
          width: '70%',  
          height: '80%', 
          display: 'relative'
        }}
      >
        {renderSeats()}
      </div>
    </div>
  );
};

export default FormCamion;
