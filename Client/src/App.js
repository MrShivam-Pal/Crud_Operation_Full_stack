import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Records from "./components/DisplayData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const App = () => {

  const [data, setData] = useState([]);

  const getUsers = async () => {
    const users = await axios.get("http://localhost:8081/user/get-users");
    if(users?.data?.success){
        setData(users?.data?.users);
    }
}

  return (<> 
    <div className="container" >
      <Form getUsers={getUsers}/>
      <Records records={data} getUsers={getUsers}/>
    </div>
    <ToastContainer />
  </>);
};

export default App;