import * as React from 'react';

import socketIOClient from "socket.io-client";

import { ChatBox } from "./Components/ChatBox";
import { Canvas } from "./Components/Canvas";
import { JoinOptions } from './Components/JoinOptions';

import { makeId } from "./Helpers/makeId";

interface IState {
  room: string;
  sender: string
  socket: any;
}

const host = "http://localhost:3001";

class App extends React.Component<{}, IState>{
  constructor(props: any) {
    super(props)

    this.state = {
      room: "", sender: "", socket: null
    }
  }


  componentDidMount() {
    this.setState({socket: socketIOClient(host), sender: makeId(5)})
  }

  public setRoomId = (roomId: string) => {
    console.log(this.state)
    this.state.socket.emit("join", roomId);
    this.setState({room: roomId})
  }

  public createChat = async () => {
    const room = makeId(5)
    this.state.socket.emit("switchroom", room);
    this.setState({room})
}

  render() {
    return(
      this.state.room === "" ? 
        <JoinOptions join={this.setRoomId} create={this.createChat} />
        :
        <div>
          <Canvas room={this.state.room} socket={this.state.socket} sender={this.state.sender}/>
          <ChatBox room={this.state.room} socket={this.state.socket} sender={this.state.sender}/>
        </div>
    )
  }
}

export default App;
