import { BrowserRouter, Route, Routes } from "react-router-dom"

import {Chat} from "./components/chat/chat.component";
import HttpService from "./services/http.service";
import {Login} from "./components/login/login";
import React from 'react';
import WebSocketService from "./services/websocket.service";

export const App = (props: any) => {

  const httpService = new HttpService("http://localhost:3000");
  const chatWSService = new WebSocketService("ws://localhost:3000/chat");

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="chat" element={<Chat chatWSService={chatWSService} httpService={httpService} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}