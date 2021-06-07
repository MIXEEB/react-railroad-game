import * as React from 'react'
import styled from 'styled-components';
import { Tile } from '../models';
import { TileMap } from './TileMap';
import { TileQueue } from './TileQueue';
import background from '../assets/background.png'
import { TileMapState } from '../store/reducers/tileMap';
import { DwarfCartState } from '../store/reducers/dwarfCart';
import button from '../assets/button.png';

interface Props {
    dwarfCart: DwarfCartState,
    tileMap: TileMapState,
    tileQueue: Tile[],
    placeRailTile: (tile: Tile) => void
    startClick: () => void
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
    background-image: url(${(props: GameAreaProps) => props.backgroundImage} )
`

const GameField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
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
export class GameLayout extends React.Component<Props> {
    constructor(props: Props){
        super(props);
    }

    render() {
        const {startClick} = this.props;

        return (<GameArea backgroundImage={background}>
            <GameField>
                <TileQueue {...this.props}></TileQueue>
                <TileMap {...this.props} placeRailTile={this.props.placeRailTile}></TileMap>
            </GameField>
        </GameArea>)
    }
}

