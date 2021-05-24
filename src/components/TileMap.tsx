import * as React from 'react'
import styled from 'styled-components';
import { getTileTypeImage, TileType, Tile, Vector2 } from '../models';
import { TileMapState } from '../store/reducers/tileMap';
import { GroundTileDiv } from './common-styled/GroundTileDiv';
import RailTileDiv from './common-styled/RailTileDiv';
import { GroundTile, RailTile, ShadowRailTile } from './Tiles';

interface Props { 
    tileMap: TileMapState,
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

interface Props3 {
    shadowTileImage: string
}   


export class TileMap extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    showEntranceExit(position: Vector2){
        const { position: exitPosition } = this.props.tileMap.exit;
        const { position: entrancePosition } = this.props.tileMap.entrance;

        return (position.x == entrancePosition.x && position.y == entrancePosition.y) ||
            (position.x == exitPosition.x && position.y == exitPosition.y);
    }   

    /*
    tunnelData={getTunnelData(tile)}
    position={tile.position}
    groundTileImage={getTileTypeImage(TileType.EMPTY)} 
    */

    render(){
        const { tileMap, tileQueue, placeRailTile } = this.props;
        const firstTileFromQueue = tileQueue[0];
        return (<TileMapLayout>
            {
                tileMap.tiles.map((tileRow: Tile[]) => {
                    return <TileMapRow key={`row_${tileRow[0].id}`}>
                        { 
                            tileRow.map((tile: Tile) => (
                                <GroundTile key={tile.id} 
                                    tile={tile}
                                    placeRailTile={placeRailTile}
                                    shadowRailTile={
                                        <ShadowRailTile 
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