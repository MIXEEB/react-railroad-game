import * as React from 'react'
import styled from 'styled-components';
import { Tile } from '../models';
import { TileMap } from './TileMap';
import { TileQueue } from './TileQueue';

interface Props {
    tileMap: Tile[][],
    tileQueue: Tile[],
    placeRailTile: (tile: Tile) => void
}


/*
const UpcomingTiles = styled.div`
    display: flex,
    flex-direction: column;
    justify-content: center
`
*/

const GameArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export class GameLayout extends React.Component<Props> {
    constructor(props: Props){
        super(props);
    }

    render() {
        return (<GameArea>
            <TileQueue {...this.props}></TileQueue>
            <TileMap {...this.props} placeRailTile={this.props.placeRailTile}></TileMap>
        </GameArea>)
    }
}

