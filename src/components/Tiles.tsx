import * as React from 'react'
import styled from 'styled-components';
import { Tile, Vector2 } from '../models';

import railHorizontal from '../assets/railHorizontal.png'
import railVertical from '../assets/railVertical.png'

//import for test put it here 
import entrance from '../assets/entrance.png'

interface GroundTileSpriteProps {
    groundTileImage: string,

}

const AbstractTileSprite = styled.div`
    width: 128px;
    height: 128px;
`;

const GroundTileSprite = styled(AbstractTileSprite)`
    background-image: url(${(props: GroundTileSpriteProps) => props.groundTileImage})
`


interface GroundTileProps {
    groundTileImage: string,
    shadowRailTile: any,
    railTile?: any,
    position: Vector2,
    showEntranceExit: boolean,
    placeRailTile: (tile: Tile) => void
}

interface GroundTileState {
    showShadow: boolean;
}

interface PropsA {
    im: string
}

const AbsoluteRailWrapper = styled.div`
    position: absolute
`

const Dummy1 = styled.div`
    position: absolute;
    width: 128px;
    height: 128px;
    margin-left: -128px;
    transform: rotate(180deg);
    background-image: url(${(props: PropsA) => props.im})
`;

const EntranceTileSprie = styled.div `
    position: absolute;
    width: 128px;
    height: 128px;
    margin-left: -128px;
`

interface EntranceTileProps {

}

class EntranceTile extends React.Component<EntranceTileProps>{
    constructor(props: EntranceTileProps) {
        super(props);
    }
}

export class GroundTile extends React.Component<GroundTileProps, GroundTileState> {
    constructor(props: GroundTileProps){
        super(props);

        this.state = {
            showShadow: false
        }
    }

    render() {
        console.log(railVertical,railHorizontal);
        return <GroundTileSprite 
                groundTileImage={this.props.groundTileImage}
                onMouseLeave={() => this.setState({showShadow: false})} 
                onMouseEnter={() => this.setState({showShadow: true})}>
                {
                    this.props.showEntranceExit && <Dummy1 im={entrance}></Dummy1>
                }
                <AbsoluteRailWrapper>{this.props.railTile}</AbsoluteRailWrapper>                
                {
                    this.state.showShadow && <AbsoluteRailWrapper>{this.props.shadowRailTile}</AbsoluteRailWrapper>
                }
        </GroundTileSprite>
    }
}

interface ShadowRailTileProps {
    railTileImage: string,
    placeRailTile: () => void
}

const ShadowRailTileSprite = styled(AbstractTileSprite)`
    opacity: 0.5;
    background-image: url(${(props: ShadowRailTileProps) => props.railTileImage});
`

export class ShadowRailTile extends React.Component<ShadowRailTileProps> {
    constructor(props: ShadowRailTileProps){
        super(props);
    }

    render() {
        const { placeRailTile } = this.props;

        return (<ShadowRailTileSprite {...this.props} onClick={placeRailTile}>
            
        </ShadowRailTileSprite>)
    }
}

const RailTileSprite = styled(AbstractTileSprite)`
    background-image: url(${(props: RailTileProps) => props.image})
`

interface RailTileProps {
    image: string
}

export class RailTile extends React.Component<RailTileProps> {
    constructor(props: RailTileProps){
        super(props);
    }

    render() {
        return <RailTileSprite {...this.props}></RailTileSprite>
    }
}