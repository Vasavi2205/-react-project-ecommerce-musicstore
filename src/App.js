// App.js
import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import { CardsProvider } from "./components/context/CardsContext";
import RegistrationForm from "../src/components/registartion/RegistrationForm";
import LoginForm from "../src/components/registartion/LoginForm";
import Products from "./components/products/Products";
import FormData from "../src/components/employees/FormData";
import CartPage from "./components/cardComponent/CardPage";
import Header from "./components/headerComponent/Header";
import MyCarousel from "../src/components/headerComponent/MyCarousel";
import Home from "./components/headerComponent/Home";
import Footer from "./components/footer/Footer";
import CardInfo from "../src/components/cardComponent/CardInfo";
import { Container } from "react-bootstrap";

import HomePage from "./components/mainPage/HomePage";

const App = () => {

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				background: "linear-gradient(to right,#B8860B , #FFFFF)",
			}}
		>
			<Container style={{ flex: "1", paddingLeft: "0px", paddingRight: "0px" }}>
				<AuthProvider>
					<Router>
						{/* {window.location.pathname === "/" && (
							<>
								<div className='bg-black text-light p-4 flex ml-0'>
									<img
										src={img1} // Replace with your image URL
										alt='Placeholder'
										className='img-fluid rounded'
										style={{
											borderRadius: "10%",
											width: "100px",
											height: "100px",
										}}
									/>
									<h1 className='display-4 text-amber-500 font-bold'>
										MusicStore
									</h1>
									<div className=' mt-9 ml-96 flex gap-16'>
										<Button
											style={{ height: "40px", marginBottom: "10px" }}
											onClick={() => setRole("Admin")}
										>
											Admin
										</Button>
										<Button
											style={{ height: "40px" }}
											onClick={() => setRole("User")}
										>
											User
										</Button>
									</div>
									{console.log(role)}
									
								</div>
							</>
						)} */}
						<Routes>
							<Route path='/home' element={<Navigate to='/homeContent' />} />
							<Route
								path='/homeContent'
								element={
									<div>
										<Header />
										<>
											<MyCarousel />
											<CardsProvider>
												<Home />
											</CardsProvider>
										</>
									</div>
								}
							/>
							<Route
								path='/products'
								element={
									<div>
										<Header />
										<Products />
									</div>
								}
							/>
							<Route
								path='/cart'
								element={
									<div>
										<Header />
										<CardsProvider>
											<CartPage />
										</CardsProvider>
									</div>
								}
							/>
							<Route
								path='/employees'
								element={
									<div>
										<Header />
										<FormData />
									</div>
								}
							/>
							<Route
								path='/items/:id'
								element={
									<div>
										<Header />
										<CardsProvider>
											<CardInfo />
										</CardsProvider>
									</div>
								}
							/>
							<Route path='/registration' element={<RegistrationForm />} />
							<Route path='/login' element={<LoginForm />} />
							<Route path='/' element={<HomePage />} />
						</Routes>
						
					</Router>
				</AuthProvider>				
			</Container>
			<Footer />
		</div>
	);
};

export default App;
