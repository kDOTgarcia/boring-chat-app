import * as React from 'react';

import styled from 'styled-components';

interface IProps {
    message: string;
}

export class ServerMessage extends React.Component<IProps, {}> {
    public render() {
        return(
            <MessageContainer>
                <MessageBubble>
                    <Text>
                        {this.props.message}
                    </Text>
                </MessageBubble>
            </MessageContainer>
        )
    }
}

const MessageContainer = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    width: 390px;
    text-align: center;
`
const MessageBubble = styled.div`
    float: center;
    border-radius: 15px 15px 15px 15px;
`
const Text = styled.p`
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    font-size: 14px;
`
