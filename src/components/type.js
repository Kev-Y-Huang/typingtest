import React from 'react';

import Textfield from './textfield';
import wordsList from '../images/words';
import Bottombar from './bottombar';
import Topbar from './topbar';

class Type extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            timer: false,
            word: '',
            words: '',
            num: 50,
            completed: 0,
            time: null
        }
    }

    componentDidMount() {
        this.setState({words: this.read(this.state.num)});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.timer && this.state.word !== '' && !this.state.disabled) {
            this.setState({
                timer: true,
                time: new Date().getTime()
            });
        }
    }

    manageTextfield = childData => {
        if (childData) {
            this.setState({
                disabled: childData,
                timer: false
            });
        } else {
            this.setState({word: ''});
        }
        this.setState({completed: this.state.completed + this.state.word.length})
    };

    inputCallback = childData => {
        if (childData.reset) {
            this.setState({
                words: this.read(this.state.num),
                disabled: false,
                completed: 0,
                timer: false
            })
        }
        this.setState({
            word: childData.word
        });
    };

    modeChange = childData => {
        this.setState({
            words: this.read(childData),
            num: childData,
            word: '',
            disabled: false,
            completed: 0,
            timer: false
        });
    };

    read(num) {
        let wordsArray = [];
        wordsList.words.forEach(word => wordsArray.push(word.englishWord));
        let result = new Array(num);
        for (let i = 0; i < num; i++) {
            const x = Math.floor(Math.random() * 1000);
            result[i] = wordsArray[x];
        }
        return result.join(' ').trim();
    };

    render() {
        return (
            <div>
                <Topbar
                    timer={this.state.timer}
                    time={this.state.time}
                    completed={this.state.completed}
                    parentCallback = {this.modeChange}
                />
                <Textfield
                    word={this.state.word}
                    words = {this.state.words}
                    parentCallback = {this.manageTextfield}
                />
                <Bottombar
                    word={this.state.word}
                    disabled={this.state.disabled}
                    parentCallback = {this.inputCallback}
                />
            </div>
        )
    }
}

export default Type;