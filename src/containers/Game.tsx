import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { tileMapActions, TileMapState } from '../store/reducers/tileMap';
import { tileQueueActions } from '../store/reducers/tileQueue';

//put some data ere
interface Props { 
    tileMap: TileMapState,
    tileQueue?: Tile[],
    placeRailTile: (tile: Tile) => void,
    rebuild: () => void
}


/*
tasks:

1. add start and exit
*/
class Game extends React.Component<Props> {
    
    private size: number = 128;
    
    constructor(props: Props) {
        super(props);

        window.addEventListener('resize', this.handleResize)
    }

    componentDidMount() {
        console.log(window.innerHeight);
        console.log(window.innerWidth)
    }

    handleResize(){
        console.log('window size changed', window.innerHeight, window.innerWidth);
    }

    render() {
        const { tileQueue, tileMap, placeRailTile} = this.props;
        console.log('props data form ')
        return (<div>
            <GameLayout 
                tileQueue={tileQueue || []} tileMap={tileMap}
                placeRailTile={(tile: Tile) => placeRailTile(tile)}>
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
            dispatch(tileQueueActions.pushForward())
        },
        rebuild: () => dispatch(tileMapActions.rebuild(TileGenerator.getEmptyTileMap({x: 3, y: 3})))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)