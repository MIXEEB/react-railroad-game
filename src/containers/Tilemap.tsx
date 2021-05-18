import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSProperties } from 'styled-components';
import { isConstructorDeclaration } from 'typescript';

import ground from '../assets/ground.png';
import railHorizontal from '../assets/railHorizontal.png';
import railVertical from '../assets/railVertical.png';
import { RailTile } from '../components/RailTile';
import { Tile, TileType, Vector2 } from '../models';
import { actions } from '../store/reducers';
import { State } from '../store/store';
import { TileGenerator } from '../store/TileGenerator';

interface Props {
    //size: Vector2;
    tiles?: Tile[][];
    rebuild: () => void;
    placeRailTile: (position: Vector2) => void;
}

class Tilemap extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
    }
    
    render() {
        const {rebuild, placeRailTile } = this.props;

        const inlineDivStyle :CSSProperties = {
            display: 'flex',
            flexDirection: 'row'
        }

        const inlineRowDivStyle: CSSProperties = {
            display: 'flex', 
            flexDirection: 'column'
        }

        console.log('all tiles', this.props.tiles);

        if (!this.props.tiles) {
            return (<div>Loading tiles..</div>)
        }

        return(<div style={inlineDivStyle}>
            {
                (this.props.tiles || []).map((tileRow: Tile[], index) => {
                    return (<div key={`r_${index}`} style={inlineRowDivStyle}>
                        {
                            (tileRow || [])
                                .map((tile: Tile)=>
                                    <RailTile key={this.generateTileKey(tile)} 
                                        groundTileImage={ground}
                                        railTileImage={this.getTileImage(tile.type)}
                                        createRailTile={() => placeRailTile(tile.position)}>
                                    </RailTile>
                            )
                        }
                    </div>)
                })
            }
            <button onClick={() => rebuild()}>Rebuild</button>
        </div>)

        
    }

    generateTileKey = (tile: Tile) =>  `${tile.position.x}${tile.position.y}`;

    getTileImage(type: TileType) {
        switch(type){
            case TileType.EMPTY:
                return ground;
            
            case TileType.HORIZONTAL:
                return railHorizontal;

            case TileType.VERTICAL:
                return railVertical;

            default:
                return ground;
        }
    }
}

const mapStateToProps = (state: State) => {
    return { 
        tiles: state.tileMap
    }
}

const mapDistatchToProps = (dispatch: any) => {
    return {
        rebuild: () => {
            //console.log('dispatching this action', actions)
            const tileGenerator = new TileGenerator({x:4, y:5});
            dispatch(actions.rebuild(tileGenerator.getNewTiles()))
        },
        placeRailTile: (position: Vector2) => {
            dispatch(actions.placeRailTile(position))
        }
    }
}

export default connect(mapStateToProps, mapDistatchToProps)(Tilemap)