import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subQuestions: [], key: 0, value: 'select', condition: 'equal' }
    this.addSubQuestion = this.addSubQuestion.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillUpdate() {
  }

  addSubQuestion() {
    let subQuestions = this.state.subQuestions;
    subQuestions.push(<Question isSubQuestion={true} parentState={this.state.value} key={this.state.key}/>);
    this.setState({ subQuestions: subQuestions, key: this.state.key += 1 });
  }

  delete() {
    let question = this.refs.question;
    question.parentNode.removeChild(question);
  }

  update(prop) {

  }

  handleChange(e) {
    let value = e.currentTarget.value;
    this.setState({ value: value })
  }

  handleCondition(e) {
    let value = e.currentTarget.value;
    this.setState({ condition: value })
  }

  addCondition() {
    if (this.props.isSubQuestion) {
      let value = this.props.parentState;
      let options;
      if (value === 'text' || value === 'radio') {
        options = (
          <select value={this.state.condition} className="condition" onChange={this.handleCondition}>
            <option value="any">Any</option>
            <option value="equal">Equal</option>
          </select>
        )
      } else {
        options = (
          <select value={this.state.condition} className="condition" onChange={this.handleCondition}>
            <option value="any">Any</option>
            <option value="equal">Equal</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
          </select>
        )
      }

      return(
        <div className="condition-wrapper">
          Condition
          <div className="condition">
            {options}
            <input className="condition"></input>
          </div>
        </div>
      );
    }
  }

  render() {
    return(
      <div ref="question" className="question-index">
        <article className="question">
          {this.addCondition()}
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
        {this.state.subQuestions.map(question => (
          React.cloneElement(question, { parentState: this.state.value })
        ))}
      </div>
    )
  }
}

export default Question;
