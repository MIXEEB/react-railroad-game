import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { tileMapActions } from '../store/reducers/tileMap';
import { tileQueueAcitons } from '../store/reducers/tileQueue';

//put some data ere
interface Props { 
    tileMap?: Tile[][],
    tileQueue?: Tile[],
    placeRailTile: (tile: Tile) => void,
    rebuild: () => void
}

//this is pure container and it initializes the game state
class Game extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { tileQueue, tileMap, placeRailTile} = this.props;
        console.log('props data form ')
        return (<div>
            <GameLayout 
                tileQueue={tileQueue || []} tileMap={tileMap || [[]]}
                placeRailTile={(tile: Tile) => placeRailTile(tile)}
                >
            </GameLayout>
        </div>)

    }
}

const mapStateToProps = (state: State) => {
    return {
        tileMap: state.tileMap,
        tileQueue: state.tileQueue
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        placeRailTile: (tile: Tile) => {
            dispatch(tileMapActions.placeRailTile(tile));
            //dispatch(actions.)
        },
        rebuild: () => dispatch(tileMapActions.rebuild(TileGenerator.getEmptyTileMap({x: 3, y: 3})))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)