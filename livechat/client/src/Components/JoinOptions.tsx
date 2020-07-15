import * as React from "react";
import styled from 'styled-components';

interface IProps {
    join(roomId: string): void;
    create(): void;
}

interface IState {
    roomId: string;
}

export class JoinOptions extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            roomId: ""
        }
    }

    public handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({roomId: event.currentTarget.value})
    }

    public join = () => {
        if(this.state.roomId !== "") {
            this.props.join(this.state.roomId);
        }
    }

    public render() {
        return (
            <PopupContainer>
                <p>Enter a Room ID</p>
                <JoinInput onChange={this.handleTextChange}></JoinInput>
                <JoinButton onClick={this.join}>Join Chat</JoinButton>
                <CreateButton onClick={this.props.create}>Create Chat</CreateButton>
            </PopupContainer>
        )
    }

}


const PopupContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -100px;
    background-color: white;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
`
const JoinInput = styled.input`
    margin: 5px;

`

const JoinButton = styled.button`
    margin: 5px;
    height: 30px; 
    background-color: #D7D7D1;
    border: none;
`

const CreateButton = styled.button`
    margin: 5px;
    height: 30px; 
    background-color: #deecfc;
    border: none;
`
