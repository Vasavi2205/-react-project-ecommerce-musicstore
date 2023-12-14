// RegistrationForm.js
import React, { useState } from "react";
import { register } from "../products/AuthService";
import { useNavigate } from "react-router-dom";

import { Form, Button, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";

const RegistrationForm = ({ role }) => {
	const { login } = useAuth();
	const [showModal, setShowModal] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
		// Implement any additional logic on modal close if needed
	};
	const checkUserExistence = async (email) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users?email=${email}`
			);
			const data = await response.json();
			return data.length > 0;
		} catch (error) {
			console.error("Error checking user existence:", error);
			return false;
		}
	};
	console.log(checkUserExistence());
	const handleRegistration = () => {
		handleClose();
		setShowLoginModal(true);
	};
	const navigate = useNavigate(); // Initialize history
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userExists = await checkUserExistence(formData.email);
		if (userExists) {
			alert("already registered please login");
		} else {
			try {
				const user = await register(formData);
				console.log("Registration successful:", user);
				// Update the register state in App.js

				handleClose();
				// Redirect to login after successful registration
				setShowLoginModal(true);
			} catch (error) {}
		}
	};

	return (
		<>
			<Modal show={showModal} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Registration Form</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label htmlFor='email' className='form-label'>
								Email:
							</label>
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								className='form-control'
								required
							/>
						</div>

						<div className='mb-3'>
							<label htmlFor='password' className='form-label'>
								Password:
							</label>
							<input
								type='password'
								name='password'
								value={formData.password}
								onChange={handleChange}
								className='form-control'
								required
							/>
						</div>

						<div className='mb-3'>
							<label htmlFor='role' className='form-label'>
								Role:
							</label>
							<select
								name='role'
								value={formData.role}
								onChange={handleChange}
								className='form-control'
							>
								<option value='' defaultValue={"select"}>
									Select Above Role
								</option>
								{/*{role === "admin" ?(<option value="user" disabled>User</option>):
                <option value="admin">Admin</option>}
                {role === "user" ?(<option value="user" >User</option>):
                <option value="admin" disabled>Admin</option>}
              </select> */}

								<option value={role}>{role}</option>
								{role === "Admin" ? (
									<option value='User' disabled>
										User
									</option>
								) : (
									<option value='Admin' disabled>
										Admin
									</option>
								)}
							</select>
						</div>

						<button type='submit' className='btn btn-primary'>
							Register
						</button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<h6>Already registered please login</h6>
					<Button variant='primary' onClick={handleRegistration}>
						Login
					</Button>
					{/* You can add additional buttons or controls here if needed */}
				</Modal.Footer>
			</Modal>
			{showLoginModal && <LoginForm />}
		</>
	);
};

export default RegistrationForm;
