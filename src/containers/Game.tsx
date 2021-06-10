import * as React from 'react'
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile, Vector2 } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { EMPTY_VECTOR } from '../store/middleware/railHelpers';
import { dwarfCartActions, dwarfCartSlice, DwarfCartState } from '../store/reducers/dwarfCart';
import { tileMapActions, TileMapState } from '../store/reducers/tileMap';
import { tileQueueActions } from '../store/reducers/tileQueue';

interface GameProps { 
    dwarfCart: DwarfCartState,
    tileMap: TileMapState,
    tileQueue?: Tile[],
    placeRailTile: (tile: Tile) => void,
    rebuild: (fieldSize: Vector2) => void,
    pushCartRequest: () => void
}

//add game end and restart
//add exit

interface GameState {
    countdown: number;
}



class Game extends React.Component<GameProps, GameState> {
    
    private pushInterval: NodeJS.Timeout | null = null;

    constructor(props: GameProps) {
        super(props);

        this.state = {
            countdown: 5
        }

        window.addEventListener('resize', this.handleResize)
    }

    componentDidMount() {
        this.runCountdown();
    }

    runCountdown = () => {
        const countdownInterval = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            })

            if (this.state.countdown <= 0){
                this.pushCart();
                //console.log('clearing intervale', countdownInterval);
                clearInterval(countdownInterval);
            }
        }, 1000) 
    }

    pushCart = () => {
        const { pushCartRequest, dwarfCart } = this.props
        this.pushInterval = setInterval(() => {
            pushCartRequest();
        }, 2000)
    }

    componentDidUpdate(prevProps: GameProps) {
        //if (this.props.dwarfCart.position === EMPTY_VECTOR){
            
            if (this.pushInterval && prevProps.dwarfCart.position !== this.props.dwarfCart.position && this.props.dwarfCart.position === EMPTY_VECTOR){
                clearInterval(this.pushInterval)
            }
        //}
        //if (this.pushInterval != null)
    }

    restartGame = () => {
        const { tileMap } = this.props;
        const x = tileMap.tiles.length;
        const y = tileMap.tiles[0].length;
        this.setState({
            countdown: 5
        });

        this.props.rebuild({x, y});
        this.runCountdown();
    }
 
    handleResize(){
        console.log('window size changed', window.innerHeight, window.innerWidth);
    }

    render() {
        const { tileQueue, tileMap, dwarfCart, placeRailTile, pushCartRequest} = this.props;
        console.log('props data form ')
        return (<div>
            <GameLayout
                countdown={this.state.countdown}
                restartGame={this.restartGame}
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
        pushCartRequest: () => dispatch(dwarfCartActions.pushCartRequest()),

        placeRailTile: (tile: Tile) => {
            dispatch(tileMapActions.placeRailTile(tile));
            dispatch(tileQueueActions.pushForward())
        },
        rebuild: (fieldSize: Vector2) => {
            dispatch(tileMapActions.rebuild(TileGenerator.getEmptyTileMap(fieldSize)));
            dispatch(dwarfCartActions.reset());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)