import React from 'react';
import {render} from 'react-dom';

//import csss
import './style/css/bootstrap.min.css';
import './index.css';

//js PERSO
import {sampleText} from './sampleText';

//Marked.js

import marked from 'marked';


class App extends React.Component {

    state = {
        text: sampleText,

    };

componentWillMount(){
    const localStorageText = localStorage.getItem('text');
  if(localStorageText){

      this.setState({text: localStorageText});
  }
}

    /**
     * avant le rendu
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text);
    }


    editText = (event) => {
        const text = event.target.value;
        this.setState({text: text});

    };


    renderText = (text) => {
        const renderText = marked(text, {sanitize: true})

        return {__html: renderText}
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                       <textarea
                           rows='35'
                           value={this.state.text}
                           className="from-control"
                           onChange={(event) => this.editText(event)}
                       >

                       </textarea>
                    </div>
                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
                    </div>
                </div>
            </div>
        )
    }
}


render(
    <App />,
    document.getElementById('root')
);