import React from 'react';

class QuestionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: [], key: 0, childActive: '' };
    this.checkCondition = this.checkCondition.bind(this);
  }

  componentWillReceiveProps() {
  }

  componentWillMount() {
    let questions = this.props.subQuestions;
    if (Object.keys(questions).length !== 0 && questions.constructor === Object) {
      for (let key in questions) {
        let question = questions[key].question;
        let type = questions[key].type;
        let conditional = questions[key].conditional;
        let conditionValue = questions[key].conditionValue;
        let subQuestions = questions[key].subQuestions;
        let preview = (
          <QuestionPreview question={question}
            type={type}
            conditional={conditional}
            conditionValue={conditionValue}
            subQuestions={subQuestions}
            active={this.state.active}
            key={this.state.key} />
        )
        this.state.preview.push(preview);
        this.state.key += 1;
      }
    }
  }

  checkCondition(e) {
    let value = e.currentTarget.value;
    let scope = this;
    this.state.preview.forEach((question, idx) => {
      if (scope.props.type === 'radio') {
        if (question.props.conditionValue === value) {
          this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          scope.setState({ checked: value });
        } else {
          this.state.preview[idx] = React.cloneElement(question, { active: '' });
          scope.setState({ checked: value });
        }
      } else if (scope.props.type === 'text') {
        if (question.props.conditional === 'equal') {
          if (question.props.conditionValue === value) {
            this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          } else {
            this.state.preview[idx] = React.cloneElement(question, { active: '' });
          }
        } else if (question.props.conditional === 'similar') {
          if (question.props.conditionValue.toLowerCase().includes(value.toLowerCase())) {
            this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          } else {
            this.state.preview[idx] = React.cloneElement(question, { active: '' });
          }
        }
      } else if (scope.props.type === 'number') {
        if (question.props.conditional === 'equal') {
          if (isNaN(parseInt(value))) return;
          if (question.props.conditionValue === value) {
            this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          } else  {
            this.state.preview[idx] = React.cloneElement(question, { active: '' });
          }
        } else if (question.props.conditional === 'greater') {
          if (question.props.conditionValue < value) {
            this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          } else  {
            this.state.preview[idx] = React.cloneElement(question, { active: '' });
          }
        } else if (question.props.conditional === 'less') {
          if (question.props.conditionValue > value) {
            this.state.preview[idx] = React.cloneElement(question, { active: 'active' });
          } else  {
            this.state.preview[idx] = React.cloneElement(question, { active: '' });
          }
        }
      }
      this.forceUpdate();
    });
  }

  constructQuestion() {
    let question = this.props.question;
    let input;
    let key = Math.random();
    if (this.props.type === 'radio') {
      input = (
        <div className='radio-preview'>
          Yes
          <input checked={this.state.checked === 'yes'}
          onChange={this.checkCondition}
          type='radio' value='yes' name={key} />
          No
          <input checked={this.state.checked === 'no'}
            onChange={this.checkCondition}
            type='radio' value='no' name={key} />
        </div>
      )
    } else if (this.props.type === 'text' || this.props.type === 'number') {
      input = <input onChange={this.checkCondition} className='text-preview'></input>
    }
    return(
      <article className="question-preview">
        <span>{question}</span>
        {input}
      </article>
    )
  }

  render() {
    return(
      <div className={`question-preview-wrapper ${this.props.active}`}>
        {this.constructQuestion()}
        {this.state.preview}
      </div>
    )
  }
}

export default QuestionPreview;
