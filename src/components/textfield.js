import React from 'react';
import typeStyle from './style/type.module.scss';

class Textfield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentWord: '',
            currentUntyped: '',
            currentCorrect: '',
            currentIncorrect: '',
            correctWords: '',
            incorrectWords: '',
            untypedWords: '',
            extraIncorrect: ''
        }
    }

    componentDidMount() {
        const words = this.props.words;
        this.setState({
            currentWord: words.split(' ')[0],
            currentUntyped: words.split(' ')[0],
            untypedWords: ' ' + words.substring(words.indexOf(' ') + 1)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.word !== prevProps.word && !(this.props.word === '' && prevProps.word.length !== 1)) {
            this.wordDidUpdate(this.props.word, prevProps.word, prevState);
        }
        if (this.props.words !== prevProps.words) {
            this.setState({
                currentWord: this.props.words.split(' ')[0],
                currentUntyped: this.props.words.split(' ')[0],
                untypedWords: ' ' + this.props.words.substring(this.props.words.indexOf(' ') + 1),
                currentCorrect: '',
                currentIncorrect: '',
                correctWords: '',
                incorrectWords: '',
                extraIncorrect: ''
            })
        }
    }

    wordDidUpdate(word, prevWord, prevState) {
        if (word.length > prevWord.length) {
            if (prevState.currentIncorrect === '') {
                if (prevState.untypedWords === '' && word === prevState.currentWord) {
                    this.setState({
                        currentWord: '',
                        currentUntyped: '',
                        currentCorrect: '',
                        currentIncorrect: '',
                        correctWords: prevState.correctWords + ' ' + prevState.currentWord,
                        incorrectWords: '',
                        untypedWords: ''
                    });
                    this.props.parentCallback(true);
                    return;
                } else if (word === prevState.currentWord.slice(0, word.length)) {
                    this.setState({
                        currentUntyped: prevState.currentUntyped.slice(1),
                        currentCorrect: prevState.currentCorrect + prevState.currentWord[word.length - 1],
                        timer: true
                    });
                    return;
                } else if (word.slice(-1) === ' ' && prevState.currentWord === word.slice(0, -1)) {
                    const untyped = prevState.untypedWords.split(' ').length === 2 ? '' : (
                        prevState.untypedWords.substring(prevState.untypedWords.slice(1).indexOf(' ') + 1)
                    );
                    this.setState({
                        correctWords: prevState.correctWords + ' ' + prevState.currentWord + ' ',
                        currentCorrect: '',
                        untypedWords: untyped,
                        currentWord: prevState.untypedWords.split(' ')[1],
                        currentUntyped: prevState.untypedWords.split(' ')[1]
                    });
                    this.props.parentCallback(false);
                    return;
                }
            }
            if (prevState.untypedWords.trim() === '' && prevState.currentUntyped.trim() === '') {
                this.setState({
                    extraIncorrect: prevState.extraIncorrect + ' '
                });
            } else if (prevState.currentUntyped !== '') {
                this.setState({
                    currentIncorrect: prevState.currentIncorrect + prevState.currentUntyped[0],
                    currentUntyped: prevState.currentUntyped.slice(1)
                })
            } else {
                this.setState({
                    incorrectWords: prevState.incorrectWords + prevState.untypedWords[0],
                    untypedWords: prevState.untypedWords.slice(1),
                });
            }
        } else if (word.length < prevWord.length) {
            if (prevState.extraIncorrect !== '') {
                this.setState({
                    extraIncorrect: prevState.extraIncorrect.slice(0, -1)
                })
            } else if (prevState.incorrectWords !== '') {
                this.setState({
                    incorrectWords: prevState.incorrectWords.slice(0, -1),
                    untypedWords: prevState.incorrectWords.slice(-1) + prevState.untypedWords,
                });
            } else if (prevState.currentIncorrect.trim() !== '') {
                this.setState({
                    incorrectWords: '',
                    currentIncorrect: prevState.currentIncorrect.slice(0, -1),
                    currentUntyped: prevState.currentIncorrect.slice(-1) + prevState.currentUntyped,
                });
            } else {
                this.setState({
                    currentCorrect: prevState.currentCorrect.slice(0, -1),
                    currentUntyped: prevState.currentCorrect.slice(-1) + prevState.currentUntyped
                });
            }
        }
    }

    handleChange = event => {
        if (event.target.value.trim() !== '' || this.state.word.trim() !== '') {
            this.setState({
                [event.target.name]: event.target.value,
                error: ''
            });
            this.wordDidUpdate(event.target.value, this.state);
        }
    };

    render() {
        return (
            <div className={typeStyle.text}>
                <span className={typeStyle.correct}>
                    {this.state.correctWords}
                    <span className={typeStyle.current}>{this.state.currentCorrect}</span>
                </span>
                {this.state.currentIncorrect.trim() !== '' || this.state.incorrectWords !== '' ? (
                    <span className={typeStyle.incorrect}>
                        <span className={typeStyle.current}>{this.state.currentIncorrect}</span>
                        {this.state.incorrectWords}
                    </span>
                ) : null}
                <span>
                    <span className={typeStyle.current}>{this.state.currentUntyped}</span>
                    {this.state.untypedWords}
                </span>
            </div>
        )
    }
}

export default Textfield;