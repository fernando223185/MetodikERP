import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post('/login', { Correo: userData.user, Contrasena: userData.password, Empresa: 0 });
      
      localStorage.setItem('user', JSON.stringify(response.data.user_data));
      localStorage.setItem('access_token', response.data.access_token);

      setUser(response.data.user_data);
      
      navigate('/comercial/reservas'); 
  
      return null; 
    } catch (error) {
      console.log('Error en la solicitud:', error.response); 
      
      if (error.response) {
        const errorMessage = error.response.data.Mensaje || 'Correo o contraseña incorrectos';
        console.log('Mensaje de error recibido:', errorMessage);
        return errorMessage;
      }
      return 'Error desconocido, intenta de nuevo';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/authentication/login');  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
