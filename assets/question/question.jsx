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
      question: '',
      confirm: ''
    }
    this.addSubQuestion = this.addSubQuestion.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
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
            <Question key={this.state.key} keyProp={this.state.key}
              isImported={true}
              isSubQuestion={true}
              conditional={subQuestions[key].conditional}
              conditionValue={subQuestions[key].conditionValue}
              question={subQuestions[key].question}
              type={subQuestions[key].type}
              subQuestions={subQuestions[key].subQuestions}
              saveData={this.props.saveData} />
          );
          this.state.key += 1;
        }
      }
    }
  }

  addSubQuestion() {
    let subQuestions = this.state.subQuestions;
    subQuestions.push(
      <Question isSubQuestion={true}
        parent={this}
        key={this.state.key}
        keyProp={this.state.key}
        saveData={this.props.saveData} />
    );
    this.setState({ subQuestions: subQuestions, key: this.state.key += 1 });
  }

  confirmDelete() {
    this.setState({ confirm: 'active' });
  }

  closeConfirmation() {
    this.setState({ confirm: '' });
  }

  deleteQuestion() {
    let questionId;
    let scope = this;
    if (this.props.parent.state.subQuestions) {
      this.props.parent.state.subQuestions.forEach( (q, idx) => {
        if (parseInt(q.key) === scope.props.keyProp) questionId = idx;
      });
      this.props.parent.state.subQuestions.splice(questionId, 1)
    } else {
      this.props.parent.state.questions.forEach( (q, idx) => {
        if (parseInt(q.key) === scope.props.keyProp) questionId = idx;
      });
      this.props.parent.state.questions.splice(questionId, 1)
    }
    this.props.parent.forceUpdate();
  }

  handleChange(e) {
    let value = e.currentTarget.value;
    this.setState({ value: value });
  }

  handleInput(prop) {
    return e => {
      this.setState({ [prop]: e.currentTarget.value });
      this.props.saveData();
    }
  }

  handleCondition(e) {
    let value = e.currentTarget.value;
    this.setState({ condition: value });
  }

  addCondition() {
    if (this.props.isSubQuestion) {
      let value = this.props.parent.state.value;
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
            <button tabIndex="1" onBlur={this.closeConfirmation} onClick={this.confirmDelete}>Delete</button>
            <aside className={`confirm-delete ${this.state.confirm}`}>
              <div className="triangle-border" />
              <div className="triangle" />
              <ul className="confirmation-buttons">
                Are you sure?
                <button onMouseDown={this.deleteQuestion}>Yes</button>
                <button onMouseDown={this.closeConfirmation}>No</button>
              </ul>
            </aside>
          </div>
        </article>
        {this.state.subQuestions.map(question => (
          React.cloneElement(question, { parent: this })
        ))}
      </div>
    )
  }
}

export default Question;
