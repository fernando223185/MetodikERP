import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import App from './App';
import SplitLogin from '../src/components/authentication/split/Login';
import { AuthProvider } from '../src/hooks/Auth/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import 'helpers/initFA';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Main>
          <Routes>
            <Route path="/authentication/login" element={<SplitLogin />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Main>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
