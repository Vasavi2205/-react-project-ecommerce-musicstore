
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUsers,
	faShoppingCart,
	faBiohazard,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import withRoleCheck from "../carousel/withRoleCheck";

const Header = () => { 
	const logoutApp=()=>{
		alert("are you sure you want logout")
        window.location.href="/"
	}
	return (
		<>
			<div>
				<Navbar bg='light' expand='lg'>
					<Navbar.Brand
						as={Link}
						to='/homeContent'
						style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}
					>
						<FontAwesomeIcon
							icon={faBiohazard}
							style={{ color: "#4eefe4", width: "50px", height: "30px" }}
						/>
						Music-Store
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav
							className='mr-auto'
							style={{ marginLeft: 650, color: "#4eefe4" }}
						>
							<Nav.Link
								as={Link}
								to='/homeContent'
								active
								style={{ color: "black" }}
							>
								<FontAwesomeIcon icon={faHome} style={{ color: "black" }} />{" "}
								Home
							</Nav.Link>
							
							<Nav.Link as={Link} to='/employees'>
								<FontAwesomeIcon icon={faUsers} /> Employess
							</Nav.Link>
							<Nav.Link as={Link} to='/products'>
								Products
							</Nav.Link>
							<Nav.Link as={Link} to='/cart'>
								Cart
								<FontAwesomeIcon icon={faShoppingCart} />
								{/* Include your cart image here */}
								<img src='path/to/cart-image.png' alt='' />
							</Nav.Link>
							<Nav.Link as={Link} onClick={logoutApp}>
								Logout
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				
			</div>
		</>
	);
};

export default Header;
