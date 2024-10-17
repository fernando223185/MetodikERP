import React, { useState, useEffect } from 'react';
import { ReactComponent as SprinterSVG } from '../../../../assets/img/camiones/base-sprinter.svg'; 
import { ReactComponent as AsientoSVG } from '../../../../assets/img/camiones/asiento-camion2.svg'; 

const FormSprinter = ({ asientos, onConfirm }) => {
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
              width: '30px',  
              display: 'inline-block',
            }}
          />
        );
      }

      const asiento = asientos.find(a => a.Asiento === pos.seatNumber);
      const isSelected = selectedSeats.includes(pos.seatNumber);
      const isReserved = asiento.Reservado;

      return (
        <div
          key={pos.seatNumber}
          onClick={() => !isReserved && handleSeatClick(pos.seatNumber)}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
            width: '60px', 
            height: '50px', 
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
              fontSize: '14px',
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
          top: '10%', 
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

export default FormSprinter;
