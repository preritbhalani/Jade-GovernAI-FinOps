import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import CostManagement from './pages/CostManagement';
import Compliance from './pages/Compliance';
import Blueprints from './pages/Blueprints';
import AuditReporting from './pages/AuditReporting';
import Integrations from './pages/Integrations';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Welcome from './pages/auth/Welcome';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.isNewUser) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<Welcome />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="cost" element={<CostManagement />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="blueprints" element={<Blueprints />} />
              <Route path="audit" element={<AuditReporting />} />
              <Route path="integrations" element={<Integrations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
