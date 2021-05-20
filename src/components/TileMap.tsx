import * as React from 'react'
import styled from 'styled-components';
import { getTileTypeImage, TileType, Tile } from '../models';
import { GroundTileDiv } from './common-styled/GroundTileDiv';
import RailTileDiv from './common-styled/RailTileDiv';
import { GroundTile, RailTile, ShadowRailTile } from './Tiles';

interface Props { 
    tileMap: Tile[][],
    tileQueue: Tile[],
    placeRailTile: (tile: Tile) => void;
}

const TileMapLayout = styled.div`
    display: flex;
    flex-direciton: column
`

const TileMapRow = styled.div`
    display: flex,
    flex-direction: row
`

interface Props2 {
    groundTileImage: string,
    railTileImage: string,
    shadowTileImage: string
}   

interface State {
    showShadow: boolean
}

/*
export const GroundTileDiv = styled.div`
    width: 128px;
    height: 128px;
    background-image: url(${(props: Props) => props.groundTileImage })
`
*/

interface Props3 {
    shadowTileImage: string
}   


export class TileMap extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const { tileMap, tileQueue, placeRailTile } = this.props;
        
        return (<TileMapLayout>
            {
                tileMap.map((tileRow: Tile[]) => {
                    return <TileMapRow key={`row_${tileRow[0].id}`}>
                        { 
                            tileRow.map((tile: Tile) => (
                                <GroundTile key={tile.id} 
                                    groundTileImage={getTileTypeImage(TileType.EMPTY)} 
                                    placeRailTile={placeRailTile}
                                    shadowRailTile={
                                        <ShadowRailTile 
                                            placeRailTile={() => placeRailTile({...tileQueue[0], position: {...tile.position}})}
                                            railTileImage={getTileTypeImage(TileType.HORIZONTAL)}>
                                        </ShadowRailTile>
                                    }
                                    railTile={
                                        tile.type != TileType.EMPTY && <RailTile image={getTileTypeImage(tile.type)}></RailTile>
                                    }>
                                   
                                </GroundTile>))

                        }
                    </TileMapRow>
                })
            }
        </TileMapLayout>)
       
    }
}