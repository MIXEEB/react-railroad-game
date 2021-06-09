import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { dwarfCartActions, dwarfCartSlice, DwarfCartState } from '../store/reducers/dwarfCart';
import { tileMapActions, TileMapState } from '../store/reducers/tileMap';
import { tileQueueActions } from '../store/reducers/tileQueue';

interface GameProps { 
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
interface GameState {
    countdown: number;
}


class Game extends React.Component<GameProps, GameState> {
    
    private size: number = 128;
    
    constructor(props: GameProps) {
        super(props);

        this.state = {
            countdown: 5
        }

        window.addEventListener('resize', this.handleResize)
    }

    componentDidMount() {
        const countdownInterval = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            })

            if (this.state.countdown <= 0){
                this.pushCart();
                clearInterval(countdownInterval);
            }
        }, 1000)
        //this.setTimeout(() => {}, 1000);
       //this.recurcive();

       this.props.rebuild();
    }

    pushCart = () => {

        const { pushCartRequest } = this.props
        setInterval(() => {
            pushCartRequest();
        }, 2000)

    }
    /*pushCart = () => {
        const { pushCartRequest } = this.props;
        setTimeout(() => {
            pushCartRequest();
            this.pushCart();
        }, 2000)
    }
    */

    handleResize(){
        console.log('window size changed', window.innerHeight, window.innerWidth);
    }

    // /startClick={() => this.pushCart()}
    render() {
        const { tileQueue, tileMap, dwarfCart, placeRailTile, pushCartRequest} = this.props;
        console.log('props data form ')
        return (<div>
            <GameLayout
                countdown={this.state.countdown}
                
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
        rebuild: () => dispatch(tileMapActions.rebuild(TileGenerator.getEmptyTileMap({x: 4, y: 4})))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)