import { Component } from 'react';
import './CharInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {
    state = {
        char: {},
        loading: false,
        error: false,
        skeleton: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charid !== prevProps.charid) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const { charid } = this.props;
        if (!charid) {
            return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacter(charid)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = (char) => {
        this.setState({
            skeleton: false,
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {

        const { char, loading, error, skeleton } = this.state;

        const skelet = skeleton ? <Skeleton /> : null
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || skelet) ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skelet}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }





}

const View = ({ char }) => {
    const { thumbnail, name, description, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
    }
    const slicomics = comics.slice(0, 10);
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className="char__img" style={imgStyle} />
                <div>
                    <div className="char__info-name">
                        {name}
                    </div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">
                                homepage
                            </div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">
                                wiki
                            </div>
                        </a>


                    </div>
                </div>


            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There are no comics found'}
                {
                    slicomics.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })

                }
            </ul>
        </>

    )
}

export default CharInfo;