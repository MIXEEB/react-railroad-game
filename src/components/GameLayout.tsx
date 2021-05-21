import * as React from 'react'
import styled from 'styled-components';
import { Tile } from '../models';
import { TileMap } from './TileMap';
import { TileQueue } from './TileQueue';
import wall from '../assets/wall.png'
import { TileMapState } from '../store/reducers/tileMap';

interface Props {
    tileMap: TileMapState,
    tileQueue: Tile[],
    placeRailTile: (tile: Tile) => void
}

interface GameAreaProps {
    backgroundImage: string
}

const GameArea = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-image: url(${(props: GameAreaProps) => props.backgroundImage} )
`

export class GameLayout extends React.Component<Props> {
    constructor(props: Props){
        super(props);
    }

    render() {
        return (<GameArea backgroundImage={wall}>
            <TileQueue {...this.props}></TileQueue>
            <TileMap {...this.props} placeRailTile={this.props.placeRailTile}></TileMap>
        </GameArea>)
    }
}

