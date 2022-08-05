import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharListItem extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // setInterval(this.updateChar, 15000);
    }
    onCharLoading = (char) => {
        this.setState({ loading: true })
    }
    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }
    onError = () => {
        this.setState({ loading: false, error: true });
    }
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const { char, loading, error } = this.state,
            errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li> */}
                    {errorMessage}
                    {spinner}
                    {content}
                    <li className="char__item char__item-selected">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { thumbnail, name } = char;
    return (
        <li className="char__item">
            <img src={thumbnail} alt="`${name}`" />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;