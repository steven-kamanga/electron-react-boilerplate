import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '@/components/LoginPage';
import { Toaster } from '@/components/ui/sonner';
import AuthLayout from '@/components/layouts/AuthLayout';
import SignUpPage from '@/components/SignUpPage';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import BusinessPage from '@/components/BusinessPage';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />} >
              <Route index element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/business" element={<BusinessPage/>} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </PersistGate>
    </Provider>
  );
}
