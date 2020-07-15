import React from 'react';

interface ls {
    start: {
        offsetX: number;
        offsetY: number;
    }
    stop: {
        offsetX: number;
        offsetY: number;
    }
}

interface IState {
    isPainting: boolean;
    line: ls[];
}

interface IProps {
    room: string;
    socket: any;
    sender: string;
}



export class Canvas extends React.Component<IProps, IState> {
    public canvas: any;
    public ctx: any;
    isPainting = false;
    userStrokeStyle = '#EE92C2';
    guestStrokeStyle = '#F0C987';
    prevPos = { offsetX: 0, offsetY: 0 };

    constructor(props: IProps) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);

        this.state = {
            isPainting: false, line: []
        }
    }

    componentDidMount() {
        this.props.socket.on("draw", (evt: any) => {
            this.onDrawingReceived(evt);
        })

        this.canvas.width = window.innerWidth - 15;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
    }

    public onDrawingReceived = (evt: any) => {
        var lines = this.state.line;
        lines = evt;
        this.setState({line: lines})
        console.log(this.state.line)
        this.state.line.map((position: ls) => {
            this.paint(position.start, position.stop, this.userStrokeStyle)
        })
    }


    public onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
    }

    public onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (this.isPainting) {
            const { offsetX, offsetY } = e.nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            const line = this.state.line;
            line.push(positionData)
            this.setState({ line })
            this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
    }

    public endPaintEvent = () => {
        if (this.isPainting) {
            this.isPainting = false;
            this.sendPaintData();
        }
    }

    public paint = (prevPos: any, currPos: any, strokeStyle: any) => {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
    }

    public  sendPaintData = () => {
        console.log(this.props.room)
        this.props.socket.emit('draw', {lines: this.state.line, roomId: this.props.room});     
    }

    render() {
        return (
            <canvas
                // We use the ref attribute to get direct access to the canvas element. 
                ref={(ref) => (this.canvas = ref)}
                style={{ background: 'black', alignSelf: 'center' }}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.endPaintEvent}
                onMouseUp={this.endPaintEvent}
                onMouseMove={this.onMouseMove}
            />
        );
    }
}