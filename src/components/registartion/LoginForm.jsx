// LoginForm.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { login } from '../products/AuthService';
import { Form, Button, Modal } from 'react-bootstrap';
const LoginForm = () => {
  const { dispatch } = useAuth();
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate(); // Initialize history
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    setShowModal(false);
    // Implement any additional logic on modal close if needed
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(credentials);
      dispatch({ type: 'LOGIN', payload: { user, role: user.role } });
      console.log('Login successful:', user);
      navigate('/home');
      // Redirect or handle success as needed
    } catch (error) {
     alert("please enter correct credentials")
    }
  };

  return (
    <><Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
        
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-control"
                  required />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-control"
                  required />
              </div>

              <button type="submit" className="btn btn-primary float-right mr-3.5">
                Login
              </button>
             
            </form>
          
    </Modal.Body>
    
    </Modal>
    </>
  );
};

export default LoginForm;