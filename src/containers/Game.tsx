import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { dwarfCartActions, dwarfCartSlice, DwarfCartState } from '../store/reducers/dwarfCart';
import { tileMapActions, TileMapState } from '../store/reducers/tileMap';
import { tileQueueActions } from '../store/reducers/tileQueue';

interface Props { 
    dwarfCart: DwarfCartState,
    tileMap: TileMapState,
    tileQueue?: Tile[],
    placeRailTile: (tile: Tile) => void,
    rebuild: () => void,
    pushCartRequest: () => void
}

//implement landing here
/* here is a list of todos:.. */
//1.dynamic rail generator
//2. starting the dwarf


class Game extends React.Component<Props> {
    
    private size: number = 128;
    
    constructor(props: Props) {
        super(props);

        window.addEventListener('resize', this.handleResize)
       // this.pushCart = this.pushCart.bind(this);
    }

    componentDidMount() {
       //this.recurcive();
    }

    pushCart = () => {
        const { pushCartRequest } = this.props;
        setTimeout(() => {
            pushCartRequest();
            this.pushCart();
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
                startClick={() => this.pushCart()}
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