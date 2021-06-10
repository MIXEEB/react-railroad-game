import * as React from 'react'
import styled from 'styled-components';
import { Tile } from '../models';
import { TileMap } from './TileMap';
import { TileQueue } from './TileQueue';
import background from '../assets/background.png'
import { TileMapState } from '../store/reducers/tileMap';
import { DwarfCartState } from '../store/reducers/dwarfCart';
import button from '../assets/button.png';
import { EMPTY_VECTOR } from '../store/middleware/railHelpers';
import ReactModal from 'react-modal';

interface Props {
    dwarfCart: DwarfCartState,
    tileMap: TileMapState,
    tileQueue: Tile[],
    countdown: number,
    placeRailTile: (tile: Tile) => void
    restartGame: () => void
    //startClick: () => void
}

interface StateGameLayout {
    showGameoverDialog: boolean
}

interface GameAreaProps {
    backgroundImage: string
}

const GameArea = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${(props: GameAreaProps) => props.backgroundImage})
`

const GameField = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const GameActions = styled.div`
    display: flex;
    flex-direction: center;
    justify-content: center;
    margin: 20px;
`

const StartButton = styled.button`
    border: none;
    background-color: Transparent;
    width: 300px;
    height: 120px;
    background-image: url(${button})
`
const ASpan = styled.div`
    display: relative;
    padding-right: -100px;
`

const TileQueueContainer = styled.div`
    float:left;
    margin-left: -128px;
`

const GameAreaSpan = styled.span`
    font-size: 40px;
    color: white;
    
    padding: 5px;
`

const GameAreaSpanBottom = styled.span`
    position: absolute:
    bottom: 0;
    font-family: 'True Crimes';
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

const GameOverFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 25px;
    width: 600px;
    height: 400px;
    background: rgba(255, 0, 0, 0.8);
`

const RegularLabel = styled.span`
    font-size: 40px;
    font-family: 'True Crimes';
    color: white;
`

const GameOverText = styled.span`
    font-family: 'True Crimes';
    color: white;
    font-size: 40px;
`

export class GameLayout extends React.Component<Props, StateGameLayout> {
    constructor(props: Props){
        super(props);

        this.state = {
            showGameoverDialog: false
        }
    }

    componentDidUpdate(prevProps: Props){
        if (this.props.dwarfCart.position === EMPTY_VECTOR && prevProps.dwarfCart.position !== this.props.dwarfCart.position){
            this.setState({
                showGameoverDialog: true
            });
        }
    }

    render() {
        const { countdown, dwarfCart, restartGame } = this.props;

        return (<GameArea backgroundImage={background}>
            <GameAreaSpan>{`Cart will launch in ${countdown} seconds`}</GameAreaSpan>
            <GameField>
                <TileQueueContainer><TileQueue {...this.props}></TileQueue></TileQueueContainer>
                <TileMap {...this.props} placeRailTile={this.props.placeRailTile}></TileMap>
            </GameField>
            <ReactModal className="modalUpdate" isOpen={this.state.showGameoverDialog}>
                <GameOverFrame>
                    <GameOverText>GAME OVER</GameOverText>
                    <ComicButton onClick={() => {this.setState({showGameoverDialog: false}); restartGame()}}>
                        <RegularLabel>Start Again?</RegularLabel>
                    </ComicButton>
                </GameOverFrame>
            </ReactModal>
        </GameArea>)
    }
}
