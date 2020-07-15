import * as React from 'react';

import styled from 'styled-components';

interface IState {
    message: string;
}

interface IProps {
    send(message: string): void;
}

export class NewMessage  extends React.Component<IProps, IState> {
    public input: any;
    constructor(props: IProps) {
        super(props);

        this.state = {
            message: ""
        }

        this.input = React.createRef();
    }

    public enter = (event: React.KeyboardEvent<HTMLElement>) => {
        if(event.keyCode === 13) {
            this.send();
        }
    }

    public send = () => {
        if (this.state.message !== "") {
            this.props.send(this.state.message);
            this.setState({ message: "" })
            this.input.current.focus();
        }
    }

    public updateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({message: event.currentTarget.value})
    }

    public render() {
        return(
            <MessageContainer>
                <MessageInput ref={this.input} value={this.state.message} onChange={this.updateMessage} onKeyDown={this.enter}/>
                <MessageSubmit onClick={this.send}><img style={{maxWidth: "100%"}} src="https://www.searchpng.com/wp-content/uploads/2019/02/Send-Icon-PNG-715x657.png"/></MessageSubmit>
            </MessageContainer>
        )
    }
}

const MessageContainer = styled.div`
justify-content: space-between;
    display: flex;
    flex-direction: row;
    margin: 5px;
    margin-top: auto;
`

const MessageInput = styled.input`
    width: 100%;
    padding: 5px;
    cursor: auto;
    background-color: rgba(255,255,255,.6);
    border: solid 2px darkgrey;
    border-radius: 5px;
`

const MessageSubmit = styled.button`
    background-color: transparent;
    margin-top: 5px;
    padding: 5px;
    border: none;
    color: black;
    border-radius: 50%;
    width: 35px;
`