import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../src/App.css";

const API_URL = "http://localhost:3001";

const Form = ({ formData, setFormData, submitForm, updateForm, isEditing }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
   
    

	return (
		<div className='form-container bg-teal-300 pl-10 pr-10 pt-7 pb-7'>
			<form onSubmit={(e) => (isEditing ? updateForm(e) : submitForm(e))}>
				<div className='mb-3'>
					<label className='form-label'>Name:</label>
					<input
						type='text'
						className='form-control'
						name='name'
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Age:</label>
					<input
						type='number'
						className='form-control'
						name='age'
						value={formData.age}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Designation:</label>
					<input
						type='text'
						className='form-control'
						name='designation'
						value={formData.designation}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Mobile Number:</label>
					<input
						type='tel'
						className='form-control'
						name='mobileNumber'
						value={formData.mobileNumber}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Salary:</label>
					<input
						type='number'
						className='form-control'
						name='salary'
						value={formData.salary}
						onChange={handleChange}
					/>
				</div>
				<button
					type='submit'
					className={`btn ${isEditing ? "btn-success" : "btn-primary"}`}
				>
					{isEditing ? "Update" : "Submit"}
				</button>
			</form>
		</div>
	);
};

const DataTable = ({ data, handleEdit, handleDelete }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        itemId: null,
      });
    
      const openDeleteConfirmation = (itemId) => {
        setDeleteConfirmation({
          isOpen: true,
          itemId,
        });
      };
    
      const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
          isOpen: false,
          itemId: null,
        });
      };
    
      const confirmDelete = () => {
        handleDelete(deleteConfirmation.itemId);
        closeDeleteConfirmation();
      };
    
    
	return (
		<div className='table-container'>
			<table className='table table-bordered table-hover '>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
						<th>Designation</th>
						<th>MobileNumber</th>
						<th>Salary</th>
						<th style={{width:"200px"}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.age}</td>
							<td>{item.designation}</td>
							<td>{item.mobileNumber}</td>
							<td>{item.salary}</td>
							<td style={{display:"flex", gap:10}}>
								<button
									className='btn btn-sm btn-primary'
									onClick={() => handleEdit(item)}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => openDeleteConfirmation(item.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
            {deleteConfirmation.isOpen && (
        <div className="overlay">
          <div className="dialog-box">
            <div className="dialog-content">
              <h2>Delete Confirmation</h2>
              <p>Are you sure you want to delete this item?</p>
              <div className="button-container" >
                <button className="btn btn-secondary" onClick={closeDeleteConfirmation}>
                  No
                </button>

                <button className="btn btn-danger  ml-10" onClick={confirmDelete} >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
		</div>
	);
};

const FormData = () => {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		designation: "",
		salary: "",
		mobileNumber: "",
	});
	const [data, setData] = useState([]);
	const [editingItem, setEditingItem] = useState(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${API_URL}/items`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const submitForm = async (e) => {
		e.preventDefault();

		try {
			if (formData.name && formData.age) {
				await axios.post(`${API_URL}/items`, formData);
				setFormData({
					name: "",
					age: "",
					designation: "",
					salary: "",
					mobileNumber: "",
				});
				fetchData();
			} else {
				console.warn("Please fill in all fields.");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};
	const updateForm = async (e) => {
		e.preventDefault();
		try {
			// Add logic to update the form data on the server using editingItem.id
			await axios.put(`${API_URL}/items/${editingItem.id}`, formData);

			// After successful update, fetch updated data
			fetchData();

			// Reset form data and editingItem state
			setFormData({
                name: "",
                age: "",
                designation: "",
                salary: "",
                mobileNumber: "",
            }); // Reset other form fields as needed
			setEditingItem(null);
		} catch (error) {
			console.error("Error updating form:", error);
		}
	};
	const handleEdit = (item) => {
		// Set the form data to the selected item
		setFormData(item);
		// Set the editingItem state to the selected item
		setEditingItem(item);
	};

	const handleDelete = async (id) => {
		try {
			// Add logic to delete the item with the given ID from the server
			await axios.delete(`${API_URL}/items/${id}`);

			// After successful deletion, fetch updated data
			fetchData();
		} catch (error) { 
			console.error("Error deleting item:", error);
		}
	};
	return (
		<div className='app-container'>
			<Form
				formData={formData}
				setFormData={setFormData}
				submitForm={submitForm}
				updateForm={updateForm}
				isEditing={!!editingItem}
			/>
			<DataTable
				data={data}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default FormData;
