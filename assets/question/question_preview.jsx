import React from 'react';

class QuestionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { preview: [], key: 0 };
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
            key={this.state.key} />
        )
        this.state.preview.push(preview);
        this.state.key += 1;
      }
    }
  }

  constructQuestion() {
    let question = this.props.question;
    let input;
    if (this.props.type === 'radio') {
      input = (
        <div className='radio-preview'>
          Yes<input type='radio' value='yes' />
          No<input type='radio' value='no' />
        </div>
      )
    } else if (this.props.type === 'text' || this.props.type === 'number') {
      input = <input className='text-preview'></input>
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
      <div className="question-preview-wrapper">
        {this.constructQuestion()}
        {this.state.preview}
      </div>
    )
  }
}

export default QuestionPreview;
