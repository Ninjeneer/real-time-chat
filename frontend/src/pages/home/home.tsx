import { Chat } from "../../components/chat/chat.component"
import { Header } from "../../components/header/header"
import HttpService from "../../services/http.service"
import WebSocketService from "../../services/websocket.service";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    httpService: HttpService;
    chatWSService: WebSocketService;
}

export const Home = (props: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/login");
        }
    });

    return (
        <div>
            <Header></Header>
            <MainContainer>
                <section className="videoContainer" style={{ flex: 2 }}>
                    <iframe style={{ width: '100%', height: '100%' }} src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </section>
                <aside className="chatContainer" style={{ height: '100%' }}>
                    <Chat chatWSService={props.chatWSService} httpService={props.httpService}></Chat>
                </aside>
            </MainContainer>
        </div>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
`