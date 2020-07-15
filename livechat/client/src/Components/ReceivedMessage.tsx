import * as React from 'react';

import styled from 'styled-components';

interface IProps {
    message: string;
}


export class ReceivedMessage  extends React.Component<IProps, {}> {
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
    padding: 5px;
    max-width: 390px;
    text-align: left;
`
const MessageBubble = styled.div`
    float: left;
    background-color: #D7D7D1;
    border-radius: 15px 15px 15px 5px;
`

const Text = styled.p`
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
`
