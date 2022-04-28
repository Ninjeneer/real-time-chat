import './register.css'

import { Link, useNavigate } from "react-router-dom";

import HttpService from "../../../services/http.service"
import { useState } from "react";

type Props = {
    httpService: HttpService;
}

export const Register = (props: Props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validate = async () => {
        if (username.trim() !== "" && password.trim() !== "") {
            const registerResponse = await props.httpService.register(username, password);
            if (registerResponse.status === 201) {
                localStorage.setItem("user", JSON.stringify(registerResponse.json()));
                navigate("/", { state: { registered: true } });
            } else {
                alert(await registerResponse.text());
            }
        }
    }

    return (
        <div className='container'>
            <div className="vertical-form">
                <h1>Sign up</h1>
                <input type="text" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)} />
                <input type="password" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                <button onClick={validate.bind(this)}>Sign up</button>
                <p>Already registered ? <Link to="/">Log in</Link></p>
            </div>
        </div>
    )
}