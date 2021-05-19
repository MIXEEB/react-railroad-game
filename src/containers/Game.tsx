import * as React from 'react'
import { connect } from 'react-redux';
import { GameLayout } from '../components/GameLayout';
import { Tile } from '../models';
import { State } from '../store';
import { TileGenerator } from '../store/helpers/TileGenerator';
import { actions } from '../store/reducers/tileMap';

//put some data ere
interface Props { 
    tileMap?: Tile[][],
    tileQueue?: Tile[],
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
        const { tileQueue } = this.props;
        return (<div>
            <GameLayout tileQueue={tileQueue || []}>
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
        rebuild: () => dispatch(actions.rebuild(TileGenerator.getEmptyTileMap({x: 3, y: 3})))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)