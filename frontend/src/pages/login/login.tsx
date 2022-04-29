import './login.css'

import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';

import HttpService from '../../services/http.service';

type Props = {
  httpService: HttpService;
}

type State = {
  registered: boolean;
}

export const Login = (props: Props, state: State) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validate = async (): Promise<void> => {
    if (username.trim() !== "") {
      props.httpService.login(username, password).then(async (response) => {
        if (response.status === 200) {
          const user = await response.json();
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          alert(await response.text());
        }
      });
    }
  }

  useEffect(() => {
    console.log(props);
    console.log(state);
  }, [])

  return (
    <div className="container">
      <div className='vertical-form'>
        <h1>Login</h1>
        { (state.registered) ?
          (<p className="registered">You are registered ! Now login to access the chat</p>) : null
        }
        <input type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
        <input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)} />
        <button onClick={validate.bind(this)}>Let's go !</button>
        <p>No account yet ? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
}