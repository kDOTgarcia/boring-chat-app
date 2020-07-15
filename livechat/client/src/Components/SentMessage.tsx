import * as React from 'react';

import styled from 'styled-components';

interface IProps {
    message: string;
}

export class SentMessage extends React.Component<IProps, {}> {
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
    width: 390px;
    text-align: right;
`
const MessageBubble = styled.div`
    float: right;
    background-color: #deecfc;
    border-radius: 15px 15px 5px 15px;
`
const Text = styled.p`
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
`
