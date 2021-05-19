import * as React from 'react'
import styled from 'styled-components';
import { getTileTypeImage, Tile } from '../models';
import RailTileDiv from './common-styled/RailTileDiv';

interface Props {
    tileQueue: Tile[]
}

const QueueDiv = styled.div`
    display: flex,
    flex-direction: column
`

export class TileQueue extends React.Component<Props> {

    constructor(props: Props){
        super(props);
    }

    render() {
        const { tileQueue } = this.props;
        return (<QueueDiv>
            {
                tileQueue.map((tile: Tile) => <RailTileDiv key={tile.id} railTileImage={getTileTypeImage(tile.type)}></RailTileDiv>)
            }
        </QueueDiv>)
    }

}