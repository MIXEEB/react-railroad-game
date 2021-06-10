import * as React from 'react'
import { flushSync } from 'react-dom'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import background from '../assets/background.png'
import button from '../assets/button.png'
import { Vector2 } from '../models'
import { tileMapActions } from '../store/reducers/tileMap'

const LandingLayout = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    background-image: url(${background});
    font-family: 'True Crimes';
`

interface RegularLabelProps {
    fontSize: string
}
const RegularLabel = styled.span`
    font-size: ${(props: RegularLabelProps) => props.fontSize}px;
    font-family: 'True Crimes';
    color: white;
`

const ComicButton = styled.div`
    border: none;
    background-color: Transparent;
    width: 300px;
    height: 120px;
    background-image: url(${button});
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const TwoDigitInput = styled.input`
    background: rgba(0, 0, 0, .1);
    border: none;
    font-family: 'True Crimes';
    color: white;
    font-size: 36px;
    width: 100px;
    padding: 5px;
    text-align: center;
    &:focus {
        outline-width: 0;
    }

`

const FieldSizeInputBox = styled.div`
    dispay: flex;
    flex-direction: row,
    justify-content: space-around;
    padding: 10px;
`

interface FieldSizeInputProps {
    minValue: number,
    maxValue: number,
    updated: (value: number) => void
}

interface FieldSizeInputState {
    inputValue: string;
}

export class FieldSizeInput extends React.Component<FieldSizeInputProps, FieldSizeInputState>{

    constructor(props: FieldSizeInputProps){
        super(props);

        this.state = {
            inputValue: this.props.minValue.toString(),
        }
    }

    isValid = (targetValue: number) => {
        return targetValue >= this.props.minValue && targetValue <= this.props.maxValue;
    }

    render() {
        const { updated } = this.props;
        return <TwoDigitInput value={this.state.inputValue} 
            onChange={(event) => this.setState({inputValue: event.target.value})} 
            onBlur={(event) => {
                this.setState({inputValue: this.isValid(parseInt(event.target.value)) ? event.target.value : this.props.minValue.toString()});
                updated(parseInt(this.state.inputValue));
            }}>
        </TwoDigitInput>
    }
}

interface LandingProps { 
    startGame: (fieldSize: Vector2) => void;
}

interface LandingState {
    fieldSize: Vector2;
    showModal: boolean;
}

class Landing extends React.Component<LandingProps, LandingState> {

    constructor(props: LandingProps) { 
        super(props);
        this.state = {
            showModal: false,
            fieldSize: {
                x: 5, y: 5
            }
        }
    }

    startHandler = () => {
        const { startGame } = this.props;
        startGame({...this.state.fieldSize});
    }

    render() {
        const {x, y} = this.state.fieldSize;
        return <LandingLayout>
            <RegularLabel fontSize="40">Enter game field size</RegularLabel>
            <FieldSizeInputBox>
                <FieldSizeInput minValue={5} maxValue={20} updated={(value: number) => this.setState({fieldSize: {x: value, y}})}></FieldSizeInput>
                <FieldSizeInput minValue={5} maxValue={20} updated={(value: number) => this.setState({fieldSize: {x, y: value}})}></FieldSizeInput>
            </FieldSizeInputBox>
            <RegularLabel fontSize="20">Min: 5; Max: 20</RegularLabel>
            <Link to="/game" style={{ textDecoration: 'none' }}>
                <ComicButton onClick={() => {this.startHandler()}}>
                    <RegularLabel fontSize="40">
                        START
                    </RegularLabel>
                </ComicButton>
            </Link>
        </LandingLayout>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGame: (fieldSize: Vector2) => dispatch(tileMapActions.startGame(fieldSize))
    }
}
export default connect(null, mapDispatchToProps)(Landing)