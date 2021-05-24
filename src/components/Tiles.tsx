import * as React from 'react'
import styled from 'styled-components';
import { getTileTypeImage, Tile, TileType, Vector2 } from '../models';

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
    tile: Tile,
    //tunnels: Tunnels
    railTile: any,
    shadowRailTile: any,
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

interface EntranceTileProps {
    top: number,
    right: number,
    bottom: number,
    left: number,
    backgroundImage: string
}


const EntranceTileSprite = styled.div `
    position: absolute;
    width: 128px;
    height: 128px;
    
    background-image: url(${(props: EntranceTileProps) => { return props.backgroundImage; }})
`

class TunnelTile extends React.Component<EntranceTileProps>{
    constructor(props: EntranceTileProps) {
        super(props);
    }

    //margin: ${(props: EntranceTileProps) => { return `${props.top}px ${props.right}px ${props.bottom}px ${props.left}px` }};

    render() {
        return (<EntranceTileSprite {...this.props}></EntranceTileSprite>)    
    }
}

/*
backgroundImage={entrance}
            top={-128}
            right={0}
            bottom={0} 
            left={0}
*/

export class GroundTile extends React.Component<GroundTileProps, GroundTileState> {
    constructor(props: GroundTileProps){
        super(props);

        this.state = {
            showShadow: false
        }
    }

    showEntranceExit() {

    }

    render() {
        /*
        if (this.props.showEntranceExit){
            debugger;
        }
        */

    /*
    tunnelData={getTunnelData(tile)}
    position={tile.position}
    groundTileImage={getTileTypeImage(TileType.EMPTY)} 
    */

    //groundTileImage: string,
    //railTile?: any,
    //position: Vector2,
    //showEntranceExit: boolean,
    //tunnelDirection: FacingDirection,


        return <GroundTileSprite 
                groundTileImage={getTileTypeImage(TileType.EMPTY)}
                onMouseLeave={() => this.setState({showShadow: false})} 
                onMouseEnter={() => this.setState({showShadow: true})}>
                {
                    /*this.showEntranceExit() && <TunnelTile 
                        backgroundImage={entrance}
                        top={0}
                        right={0}
                        bottom={0} 
                        left={0}></TunnelTile>
                    */
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