import React from 'react';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate() {
    let questions = this.traverseDOM(document.querySelector('ul.questions'));
    console.log(questions);
  }

  extractContents(node) {
    let question = node.children[0];
    let input = question.querySelector('input').value;
    let select = question.querySelector('select').value;
    let condition = question.querySelector('div.condition-wrapper');
    let conditional = condition ? condition.children[0] : undefined;
    let conditionValue = condition ? condition.children[1] : undefined;
    return({
      input: input,
      select: select,
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

  render() {
    return(
      <div>
        asfasdfad
      </div>
    )
  }
}

export default Preview;
