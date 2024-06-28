import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Form = ({ getUsers }) => {

    const [inputs, setInputs] = useState({name: "", email: "", MobileNo: "" ,pinCode: "", city: "",  state: ""});

    const changeHandler = async (event) => {
        setInputs({
                ...inputs,
                [event.target.name]:event.target.value
            });  
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const result = await axios.post("http://localhost:8081/user/create", inputs);
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
        setInputs({name: "", email: "", MobileNo: "" ,pinCode: "", city: "",  state: ""});
    };

    const handleReset = async (event) => {
        event.preventDefault();
        setInputs({name: "", email: "", MobileNo: "" ,pinCode: "", city: "",  state: ""});
    };

    return (<>
        <div id="table-form">

        <h1>Create User</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
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

          
          <button type="submit" id="save-button" >Submit</button>
          <button type="reset" id="save-button" >Reset</button>
        </form>
        </div>

    </>);
};

export default Form;