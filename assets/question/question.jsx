import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subQuestions: [], key: 0, value: 'select' }
    this.addSubQuestion = this.addSubQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  addSubQuestion() {
    let subQuestions = this.state.subQuestions;
    subQuestions.push(<Question key={this.state.key}/>);
    this.setState({ subQuestions: subQuestions, key: this.state.key += 1 });
  }

  delete() {
    let question = this.refs.question;
    question.parentNode.removeChild(question);
  }

  handleChange(e) {
    let value = e.currentTarget.value;
    this.setState({ value: value })
  }

  render() {
    return(
      <div ref="question" className="question-index">
        <article className="question">
          Question
          <input className="question" placeholder=""></input>
          Question Type
          <select value={this.state.value} className="question-type" onChange={this.handleChange}>
            <option value="select" disabled>--Select Option--</option>
            <option value="radio">Yes/No</option>
            <option value="number">Number</option>
            <option value="text">Text</option>
          </select>
          <div className="question-buttons">
            <button onClick={this.addSubQuestion}>Add sub-input</button>
            <button onClick={this.delete}>Delete</button>
          </div>
        </article>
        {this.state.subQuestions}
      </div>
    )
  }
}

export default Question;
