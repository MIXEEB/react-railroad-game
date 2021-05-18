import * as React from 'react'
import styled from 'styled-components'
import { Vector2 } from '../models';

interface Props {
    railTileImage: string,
    groundTileImage: string,
    createRailTile: () => void
}

const GroundTileDiv = styled.div`
    width: 128px;
    height: 128px;
    background-image: url(${(props: Props) => props.groundTileImage })
`

const RailTileDiv = styled.div`
    width: 128px;
    height: 128px;
    background-image: url(${(props: Props) => props.railTileImage })
`

export class RailTile extends React.Component<Props, {}>{ 

    constructor (props: Props) {
        super(props);
    }   

    render() {
        const { createRailTile } = this.props

        return (<GroundTileDiv {...this.props} onClick={createRailTile}>
            <RailTileDiv {...this.props}></RailTileDiv>
        </GroundTileDiv>)
    }

}