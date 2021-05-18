import * as React from 'react'

import railVertical from '../assets/railVertical.png';
import railHorizontal from '../assets/railHorizontal.png';
import { MovementPrototype } from './MovementPrototype';
import { RailTile } from './RailTile';

interface Props {
    /* size of board should be ere */
}

export class Railroad extends React.Component<{}, {}> {
    constructor(props: Props) {
        super(props)
    }

    //do now protypical rendering
    //<RailTile railTileImage={railVertical}></RailTile>
    //<RailTile railTileImage={railHorizontal}></RailTile>
    render() {
        return (<div>
            <span>railroad</span>
            
        </div>)
    }
}