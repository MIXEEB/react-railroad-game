import * as React from 'react'
import styled from 'styled-components';
import { FacingDirection, getTileTypeImage, Tile, TileType, Tunnel, Tunnels, Vector2 } from '../models';

import railHorizontal from '../assets/railHorizontal.png'
import railVertical from '../assets/railVertical.png'

import tunnel from '../assets/tunnel.png'
import dwarf from '../assets/dwarf.png'
import { dwarfCartActions, DwarfCartState } from '../store/reducers/dwarfCart';

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
    dwarfCart: DwarfCartState | null,
    tunnels: Tunnels,
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

interface TunnelSpriteProps {
    margin: string,
    transform: string
    backgroundImage: string
}

const EntranceTileSprite = styled.div `
    position: absolute;
    width: 128px;
    height: 128px;
    ${(props: TunnelSpriteProps) => props.margin}
    ${(props: TunnelSpriteProps) => props.transform}
    ${(props: TunnelSpriteProps) => props.backgroundImage}
`

interface DwarfCartSpriteProps {
    backgroundImage: string,
    marginTop: string,
    marginLeft: string
}
// background-image: url(${(props: PropsA) => props.im})

const DwarfCartSprite = styled.div `
    position: absolute;
    width: 128px;
    height: 128px;
    ${(props: DwarfCartSpriteProps) => {console.log(props.marginTop); return props.marginTop; }}
    ${(props: DwarfCartSpriteProps) => { console.log(props.marginLeft); return props.marginLeft; }}
    background-image: url(${(props: DwarfCartSpriteProps) => props.backgroundImage})
` 
// 

export class GroundTile extends React.Component<GroundTileProps, GroundTileState> {
    constructor(props: GroundTileProps){
        super(props);
        this.state = {
            showShadow: false
        }
    }

    getTunnelStyleProps(tunnel: Tunnel)  {
        const marginPostfix = FacingDirection[tunnel.facingDirection];
        const enumNumeric = (tunnel.facingDirection as number);
    
        return {
            margin: `margin-${marginPostfix}: ${Math.sign(enumNumeric) * 128}px;`,
            transform: `transform: rotate(${(enumNumeric-1) * 90}dev);`,
            backgroundImage: `background-image: url(${tunnel});`
        }
    }

    getTunnelProps() {
        const { position } = this.props.tile;
        
        const { position: exitPosition } = this.props.tunnels.exit;
        const { position: entrancePosition } = this.props.tunnels.entrance;

        const generateStyleProps = (tunnel: Tunnel) => {
            const marginPostfix = FacingDirection[tunnel.facingDirection];
            const enumNumeric = (tunnel.facingDirection as number);
        
            return {
                margin: `margin-${marginPostfix}: ${Math.sign(enumNumeric) * 128}px;`,
                transform: `transform: rotate(${(enumNumeric-1) * 90}dev);`,
                backgroundImage: `background-image: url(${tunnel});`
            }
        }

        if (position.x == entrancePosition.x && position.y == entrancePosition.y) {
            return generateStyleProps(this.props.tunnels.entrance);
        }

        if (position.x == exitPosition.x && position.y == exitPosition.y) {
            return generateStyleProps(this.props.tunnels.exit);
        }

        return null;
    }

    showEntranceExit() {
        const { position } = this.props.tile;
        
        const { position: exitPosition } = this.props.tunnels.exit;
        const { position: entrancePosition } = this.props.tunnels.entrance;

        return (position.x == entrancePosition.x && position.y == entrancePosition.y) ||
            (position.x == exitPosition.x && position.y == exitPosition.y);
    }

/*
    const marginTop = Math.round((position.y % Math.floor(position.y) * 10));
    const marginLeft = Math.round((position.x % Math.floor(position.x) * 10));
        
*/

    getDwarfMargin = (value: number): {marginTop: string, marginLeft: string} => {
        return {
            marginLeft: `margin-left: ${value}px;`,
            marginTop: 'margin-top: 0px;'
        }
    }

    render() {
        const { dwarfCart } = this.props;
        const tunnelProps = this.getTunnelProps();

        const margin = dwarfCart ? this.getDwarfMargin(dwarfCart.animation.value) : {marginLeft: 'margin-left: 0px;', marginTop: 'margin-top 0px;'};
        return <GroundTileSprite 
                groundTileImage={getTileTypeImage(TileType.EMPTY)}
                onMouseLeave={() => this.setState({showShadow: false})} 
                onMouseEnter={() => this.setState({showShadow: true})}>
                {
                    tunnelProps && <EntranceTileSprite {...tunnelProps}></EntranceTileSprite>
                }
                <AbsoluteRailWrapper>{this.props.railTile}</AbsoluteRailWrapper>
                {
                    dwarfCart && <DwarfCartSprite backgroundImage={dwarf} marginLeft={margin.marginLeft} marginTop={margin.marginTop} ></DwarfCartSprite>
                }
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