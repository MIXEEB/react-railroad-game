import * as React from 'react'
import rail from '../assets/rail.png'
import dwarf from '../assets/dwarf.png'

interface State {
    dwarfPaddingPercent: number
}

interface Props {

}

export class MovementPrototype extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            dwarfPaddingPercent: 100
        }
        this.shiftDwarf();
    }

    shiftDwarf() {
        setTimeout(() => {
            if (this.state.dwarfPaddingPercent === 0) {
                return;
            }
            
            this.setState({
                dwarfPaddingPercent: this.state.dwarfPaddingPercent - 10
            });

            this.shiftDwarf()
        }, 500);
    }

    render() {

        const { dwarfPaddingPercent } = this.state;

        const railStyle = {
            width: '128px',
            height: '128px',
            backgroundImage: `url(${rail})`
        };

        const dwarfStyle = {
            width: '128px',
            height: '128px',
            backgroundImage: `url(${dwarf})`
        }

        const dwarfContainerStyle = {
            width: '128px',
            height: '128px',
            paddingLeft: `${dwarfPaddingPercent}%`
        }

        return (<div>
            <div key="rail" style={railStyle}> 
                <div style={dwarfContainerStyle}>
                    <div style={dwarfStyle}>
                    </div>
                </div>
            </div>
        </div>) 
    }

}