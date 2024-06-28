import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DisplayData = ({ records, getUsers }) => {

    const [inputs, setInputs] = useState({name: "", phoneNumber: "", email: "", postalCode: "", city: "",  state: ""});
    const [id, setId] = useState();

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])

    const changeHandler = async (event) => {
        setInputs((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ));  
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (window.confirm('Are you sure to Edit?')) editRecord(inputs, id);
    };

    const editRecord = async () => {
        try{
            const result = await axios.put(`http://localhost:8081/user/edit/${id}`, inputs);
            if(result?.data?.success){
                toast.success(result?.data?.message);
            }
            else{
                toast.error(result?.data?.message);
            }
        }
        catch(error){
            toast.error(error);
        }
        getUsers();
    };

    const removeRecord = async (userId) => {
        try{
            const result = await axios.delete(`http://localhost:8081/user/delete/${userId}`);
            if(result?.data?.success){
                toast.success(result?.data?.message);
            }
            else{
                toast.error(result?.data?.message);
            }
        }
        catch(error){
            toast.error(error);
        }
        getUsers();
    };

    return (<>
        <div id="table-list">
        <h1>List Of Records</h1>
        <div id="table-content">
        <table  border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>MobileNo</th>
                    <th>Pin Code</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => 
                  <tr key={index}>
                    <td>{record.name}</td>
                    <td>{record.email}</td>
                    <td>{record.MobileNo}</td>
                    <td>{record.pinCode}</td>
                    <td>{record.city}</td>
                    <td>{record.state}</td>
                    <td>
                        <button type="button" className="edit-btn" onClick={() => { setInputs(record); setId(record._id); }} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button className="delete-btn" onClick={() => { if (window.confirm('Are you sure to delete?')) removeRecord(record._id) } }>Delete</button>
                    </td>
                 </tr>
                )}
            </tbody>
        </table>
        </div>
        </div>

        
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" id="table-form">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Record</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={submitHandler}>
                <div>
                <label>Name: </label>
                <input type="text" name="name" value={inputs.name} onChange={changeHandler} required/>
                </div>


                <div>
                <label>Email: </label>
                <input type="email" name="email" value={inputs.email} onChange={changeHandler} required/>
                </div>

                <div>
                <label>Phone No: </label>
                <input type="tel" pattern="[0-9]*" maxLength="10" minLength="10" name="MobileNo" value={inputs.MobileNo} onChange={changeHandler} required/>
                </div>

                <div>
                <label>Pin Code: </label>
                <input type="tel" pattern="[0-9]*" maxLength="6" minLength="6" name="pinCode" value={inputs.pinCode} onChange={changeHandler} required/>
                </div>

          <div>
          <label>City: </label>
          <select name="city" value={inputs.city} onChange={changeHandler} required>
          <option value="" disabled>Select a city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Bangluru">Bangluru</option>
          <option value="Hydrabad">Hydrabad</option>
          </select>
          </div>

          <div>
          <label>State: </label>
          <select name="state" value={inputs.state} onChange={changeHandler} required>
          <option value="" disabled>Select a State</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          </select>
          </div>

            <button id="save-button" type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
            </div>
        </div>
        </div>
    </>);
};

export default DisplayData;