import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subQuestions: [], key: 0 }
    this.addSubQuestion = this.addSubQuestion.bind(this);
  }

  addSubQuestion() {
    let subQuestions = this.state.subQuestions;
    subQuestions.push(<Question key={this.state.key}/>);
    this.setState({ subQuestions: subQuestions, key: this.state.key += 1 });
  }

  render() {
    return(
      <div className="question-index">
        <article className="question">
          Question
          <input className="question" placeholder=""></input>
          Question Type
          <select defaultValue="option-1" className="question-type">
            <option id="option-1" disabled>--Select Option--</option>
            <option>yaya</option>
            <option>yaya</option>
            <option>yaya</option>
          </select>
          <div className="question-buttons">
            <button onClick={this.addSubQuestion}>Add sub-input</button>
            <button>Delete</button>
          </div>
          {this.state.subQuestions}
        </article>
      </div>
    )
  }
}

export default Question;
