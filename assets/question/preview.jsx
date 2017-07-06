import React from 'react';
import QuestionPreview from './question_preview';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: {}, preview: [], key: 0, active: 'active' };
  }

  componentWillUpdate() {
    this.state.preview = [];
    let questions = this.traverseDOM(document.querySelector('ul.questions'));
    this.state.questions = questions;
    this.createPreview(questions);
  }

  extractContents(node) {
    let questionWrapper = node.children[0];
    let question = questionWrapper.querySelector('input.question').value;
    let type = questionWrapper.querySelector('select.question-type').value;
    let condition = questionWrapper.querySelector('div.condition-wrapper');
    let conditional = condition ? condition.children[0].children[0].value : null;
    let conditionValue = condition ? condition.children[0].children[1].value : null;
    return({
      question: question,
      type: type,
      conditional: conditional,
      conditionValue: conditionValue,
      subQuestions: {}
    })
  }

  traverseDOM(parent, currentState = {}) {
    let children = parent.querySelectorAll(':scope > div.question-index');
    children.forEach((child, idx) => {
      let question = this.extractContents(child);
      currentState[`question${idx}`] = question;
      this.traverseDOM(child, currentState[`question${idx}`].subQuestions);
    });
    return currentState;
  }

  createPreview(questions) {
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
          key={this.state.key}/>
      )
      this.state.preview.push(preview);
      this.state.key += 1;
    }
  }

  render() {
    return(
      <ul className="preview-index">
        {this.state.preview.map(question => (
          React.cloneElement(question, { active: this.state.active })
        ))}
      </ul>
    )
  }
}

export default Preview;
