import * as React from 'react'
import styled from 'styled-components';
import { getTileTypeImage, TileType, Tile, Vector2, vector2Equals } from '../models';
import { dwarfCartSlice, DwarfCartState } from '../store/reducers/dwarfCart';
import { TileMapState } from '../store/reducers/tileMap';
import { GroundTileDiv } from './common-styled/GroundTileDiv';
import RailTileDiv from './common-styled/RailTileDiv';
import { GroundTile, RailTile, ShadowRailTile } from './Tiles';

interface Props { 
    tileMap: TileMapState,
    tileQueue: Tile[],
    dwarfCart: DwarfCartState,
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

interface Props3 {
    shadowTileImage: string
}   

export class TileMap extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const { tileMap, tileQueue, dwarfCart, placeRailTile } = this.props;
        const firstTileFromQueue = tileQueue[0];

        const { tiles } = tileMap;
        return (<TileMapLayout>
            {
                tiles.length > 0 && tileMap.tiles.map((tileRow: Tile[]) => {
                    return <TileMapRow key={`row_${tileRow[0].id}`}>
                        { 
                            tileRow.map((tile: Tile) => (
                                <GroundTile key={tile.id} 
                                    tile={tile}
                                    dwarfCart={vector2Equals(dwarfCart.position, tile.position) ? dwarfCart : null}
                                    placeRailTile={placeRailTile}
                                    shadowRailTile={
                                        <ShadowRailTile 
                                            enabled={tile.type === TileType.EMPTY}
                                            placeRailTile={() => placeRailTile({...tileQueue[0], position: {...tile.position}})}
                                            railTileImage={getTileTypeImage(tileQueue[0].type)}>
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