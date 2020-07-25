import React from 'react';
import typeStyle from './style/type.module.scss';
import {Button, Input} from 'theme-ui';

class Bottombar extends React.Component {
    handleChange = event => {
        if (event.target.value.trim() !== '' || this.props.word.trim() !== '') {
            this.props.parentCallback({word: event.target.value});
        }
    };

    resetWords = event => {
        this.props.parentCallback({
            word: '',
            reset: true
        });
    };

    render() {
        return (
            <div className={typeStyle.bottom}>
                <Input
                    className={typeStyle.input}
                    name={'word'}
                    value={this.props.word}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                    autoComplete={"off"}
                />
                <Button
                    className={typeStyle.button}
                    onClick={this.resetWords}
                >
                    Reset
                </Button>
            </div>
        )
    }
}

export default Bottombar;