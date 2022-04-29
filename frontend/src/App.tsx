import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Home } from "./pages/home/home";
import HttpService from "./services/http.service";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import WebSocketService from "./services/websocket.service";

export const App = (props: any) => {

  const httpService = new HttpService("http://localhost:3000");
  const chatWSService = new WebSocketService("ws://localhost:3000/chat");

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home chatWSService={chatWSService} httpService={httpService} />}></Route>
        <Route path="login" element={<Login httpService={httpService} />}></Route>
        <Route path="register" element={<Register httpService={httpService} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}