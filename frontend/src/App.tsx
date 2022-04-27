import { BrowserRouter, Route, Routes } from "react-router-dom"

import {Chat} from "./components/chat/chat.component";
import {Login} from "./components/login/login";
import React from 'react';

export const App = (props: any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="chat" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}