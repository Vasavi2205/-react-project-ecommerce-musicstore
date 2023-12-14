import React, { useState } from "react";
import img1 from "../../assets/icon3.png";
import img3 from "../../assets/carosel/img5.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../registartion/RegistrationForm";
const HomePage = () => {
	const [role, setRole] = useState(null);
    const navigate = useNavigate(); 
    const adminLogin=()=>{
        setRole("Admin");
        navigate("/registration")
    }
	return (
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
				<h1 className='display-4 text-amber-500 font-bold'>MusicStore</h1>
				<div className=' mt-9 ml-96 flex gap-16'>
					<Button
						style={{ height: "40px", marginBottom: "10px" }}
						onClick={() => setRole("Admin")}
					>
						Admin
					</Button>
					<Button style={{ height: "40px" }} onClick={() => setRole("User")}>
						User
					</Button>
				</div>
				{console.log(role)}
                {role && <RegistrationForm role={role} />}
			</div>
			<div className='flex'>
				<div className='mt-32 display-4 text-amber-500 font-bold'>
					<h1 className=' display-4 text-amber-500 font-bold'>Welcome to Music Store to buy in online </h1>
					<p>To explore More Select User and Register</p>
				</div>
				<img
					className='mt-7 float-right'
					style={{ width: "113vh", height: "430px", marginBottom: "50px" }}
					src={img3}
				/>
			</div>
		</>
	);
};

export default HomePage;
