import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subQuestions: [],
      key: 0,
      value: 'select',
      condition: 'equal',
      conditionValue: '',
      question: ''
    }
    this.addSubQuestion = this.addSubQuestion.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    if (this.props.isImported) {
      let question = this.props.question;
      let type = this.props.type;
      let conditional = this.props.conditional;
      let conditionValue = this.props.conditionValue;
      let subQuestions = this.props.subQuestions;

      if (conditional === null) {
        this.setState({
          question: question,
          value: type
        });
      } else {
        this.setState({
          question: question,
          condition: conditional,
          conditionValue: conditionValue,
          value: type
        });
      }

      if (Object.keys(subQuestions).length !== 0 && subQuestions.constructor === Object) {
        for (let key in subQuestions) {
          this.state.subQuestions.push(
            <Question key={this.state.key}
              isImported={true}
              isSubQuestion={true}
              conditional={subQuestions[key].conditional}
              conditionValue={subQuestions[key].conditionValue}
              question={subQuestions[key].question}
              type={subQuestions[key].type}
              subQuestions={subQuestions[key].subQuestions} />
          );
        }
      }
    }

  }

  addSubQuestion() {
    let subQuestions = this.state.subQuestions;
    subQuestions.push(
      <Question isSubQuestion={true}
        parentState={this.state.value}
        key={this.state.key} />
    );
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

  handleInput(prop) {
    return e => this.setState({ [prop]: e.currentTarget.value })
  }

  handleCondition(e) {
    let value = e.currentTarget.value;
    this.setState({ condition: value })
  }

  addCondition() {
    if (this.props.isSubQuestion) {
      let value = this.props.parentState;
      let options;
      if (value === 'radio') {
        options = (
          <div className="condition">
            <select value={this.state.condition} className="condition" onChange={this.handleCondition}>
              <option value="none">None</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <input className="condition disabled"
              onChange={this.handleInput('conditionValue')}
              value={this.state.conditionValue}
              disabled></input>
          </div>
        )
      } else if (value === 'text') {
        options = (
          <div className="condition">
            <select value={this.state.condition} className="condition" onChange={this.handleCondition}>
              <option value="equal">Equal</option>
              <option value="similar">Similar</option>
            </select>
            <input className="condition"
              onChange={this.handleInput('conditionValue')}
              value={this.state.conditionValue}></input>
          </div>
        )
      } else {
        options = (
          <div className="condition">
            <select value={this.state.condition} className="condition" onChange={this.handleCondition}>
              <option value="equal">Equal</option>
              <option value="greater">Greater Than</option>
              <option value="less">Less Than</option>
            </select>
            <input className="condition"
              onChange={this.handleInput('conditionValue')}
              value={this.state.conditionValue}></input>
          </div>
        )
      }

      return(
        <div className="condition-wrapper">
          Condition
          {options}
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
          <input onChange={this.handleInput('question')}
            className="question"
            placeholder=""
            value={this.state.question} />
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
