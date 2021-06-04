import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { dwarfCartActions, dwarfCartSlice, DwarfCartState } from '../store/reducers/dwarfCart';
import { tileMapActions, TileMapState } from '../store/reducers/tileMap';
import { tileQueueActions } from '../store/reducers/tileQueue';

//put some data ere
interface Props { 
    dwarfCart: DwarfCartState,
    tileMap: TileMapState,
    tileQueue?: Tile[],
    placeRailTile: (tile: Tile) => void,
    rebuild: () => void,
    pushCartRequest: () => void
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
        this.recurcive = this.recurcive.bind(this);
    }

    componentDidMount() {
       //this.recurcive();
    }

    recurcive = () => {
        const { pushCartRequest } = this.props;
        setTimeout(() => {
            pushCartRequest();
            this.recurcive();
        }, 2000)
    }

    handleResize(){
        console.log('window size changed', window.innerHeight, window.innerWidth);
    }



    render() {
        const { tileQueue, tileMap, dwarfCart, placeRailTile, pushCartRequest} = this.props;
        console.log('props data form ')
        return (<div>
            <GameLayout 
                startClick={() => this.recurcive()}
                dwarfCart={dwarfCart}
                tileQueue={tileQueue || []} tileMap={tileMap}
                placeRailTile={(tile: Tile) => placeRailTile(tile)}>
            </GameLayout>
        </div>)

    }
}

const mapStateToProps = (state: State) => {
    return {
        ...state
        /*dwarfCart: state.dwarfCat
        tileMap: state.tileMap,
        tileQueue: state.tileQueue*/
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        //to do implement this
        pushCartRequest: () => dispatch(dwarfCartActions.pushCartRequest()),

        placeRailTile: (tile: Tile) => {
            dispatch(tileMapActions.placeRailTile(tile));
            dispatch(tileQueueActions.pushForward())
        },
        rebuild: () => dispatch(tileMapActions.rebuild(TileGenerator.getEmptyTileMap({x: 3, y: 3})))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)