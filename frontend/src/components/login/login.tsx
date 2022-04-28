import './login.css'

import React from 'react';
import { useNavigate } from "react-router-dom"

export const Login = (props: any) => {

  const [user, setUser] = React.useState<string>("");
  const navigate = useNavigate();

  const validate = (): void => {
    if (user.trim() !== "") {
      // Save the user in the localStorage
      localStorage.setItem("user", user);
      // Redirect to the chat
      navigate("/chat");
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <h1>Enter username</h1>
        <input type="text" onChange={(event) => setUser(event.target.value)} />
        <button onClick={validate.bind(this)}>Let's go !</button>
      </div>
    </div>
  );
}