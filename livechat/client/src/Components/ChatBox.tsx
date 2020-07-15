import * as React from 'react';
import styled from 'styled-components';

import { SentMessage } from "./SentMessage";
import { ServerMessage } from "./ServerMessage";
import { ReceivedMessage } from "./ReceivedMessage";
import { NewMessage } from './NewMessage';

class Message {
    text!: string;
    sender!: string;
}

interface IState {
    messages: Message[];
    last: string;
    word: string;
}

interface IProps {
    room: string;
    socket: any;
    sender: string;
}

export class ChatBox extends React.Component<IProps, IState> {
    public messagesEnd: any;
    constructor(props: IProps) {
        super(props);

        this.state = {
            messages: [ ], last: "", word: ""
        }
    }

    public componentDidMount = () => {
        this.props.socket.on("message", (evt: any) => {
            this.messageReceived(evt);
        })

        this.props.socket.on("newword", (evt: any) => {
            this.setState({word: evt})
        })

        this.newWord();
        this.scrollToBottom();
    }

    public newWord = () => {
        this.props.socket.emit("newword", {room: this.props.room, sender: this.props.sender});
    }

    public componentDidUpdate = () => {
        this.scrollToBottom();
    }

    public scrollToBottom = () => {
        if (this.messagesEnd !== undefined ) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    public messageReceived = (evt: any) => {
        var messages = this.state.messages;
        messages.push(evt)
        console.log(messages);
        this.setState({messages})
    }

    public sendMessage = (message: string) => {
        this.props.socket.emit('message', {text: message, sender: this.props.sender, room: this.props.room});
    }

    public showMessages = () => {
        return (
            <ChatContainer>
                <MessagesContainer>
                    {this.state.messages.map((message, i) => {
                        if(message.sender === "server") {
                            return <ServerMessage message={message.text} />
                        } else {
                            if (message.sender === this.props.sender) {
                                return <SentMessage message={message.text}></SentMessage>
                            } else {
                                return <ReceivedMessage message={message.text}></ReceivedMessage>
                            }
                        }
                    })}
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </MessagesContainer>
                <NewMessage send={this.sendMessage} />
                <p style={{ textAlign: "center"}}>Room ID: {this.props.room}</p>
            </ChatContainer>)
    }

    public render() {
        return(
            <ContentContainer>
                {this.state.word == "" ? null : <div>Word to draw: {this.state.word} <button style={{float: "right"}} onClick={this.newWord}>New word?</button></div>}
                    {this.showMessages()}
            </ContentContainer>
        )
    }
}


const ContentContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -200px;
    display: flex;
    flex-direction: column;

`
const ChatContainer = styled.div`
    background-color: rgba(255,255,255, .7);
    height: 400px;
    width: 400px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
`

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
` as any;
