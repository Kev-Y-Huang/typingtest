import React from 'react';
import {Box} from 'theme-ui';

import typeStyle from './style/type.module.scss';
import Timer from './timer';

const modes = [
    "Set Number",
    "Set Time",
    "Paragraph"
];
const numOfWords = [
    10,
    25,
    50,
    100,
    250
];

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wpm: '--',
            mode: 'Set Number'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.completed !== prevProps.completed) {
            this.setState({wpm: this.props.completed * 12000 / (new Date().getTime() - this.props.time)});
        }
    }

    handleChange = event => {
        if (event.target.value.trim() !== '') {
            if (event.target.name === 'words') {
                this.props.parentCallback(event.target.value);
            } else if (event.target.name === 'mode') {
                this.setState({mode: event.target.value.trim()});
            }
        }
    };

    modes = (
        modes.map(mode => {
            return (
                <option key={mode}>{mode}</option>
            )
        })
    );

    numOfWords = (
        numOfWords.map(num => {
            return (
                <option key={num}>{num}</option>
            )
        })
    );

    render() {
        return (
            <div className={typeStyle.top}>
                <select
                    name={"mode"}
                    className={typeStyle.select}
                    onChange={this.handleChange}
                    defaultValue={'Set Number'}
                >
                    {this.modes}
                </select>
                {
                    this.state.mode === 'Set Number' ? <select
                        name={"words"}
                        className={typeStyle.select}
                        onChange={this.handleChange}
                        defaultValue={'50'}
                    >
                        {this.numOfWords}
                    </select> : null
                }
                <Box
                    className={typeStyle.box}
                    bg={'primary'}
                >
                    {typeof(this.state.wpm) === "number" ? Math.round(this.state.wpm) : this.state.wpm}wpm
                </Box>
                <Timer timer={this.props.timer}/>
            </div>
        )
    }
}

export default Topbar;