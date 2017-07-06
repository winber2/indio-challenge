import React from 'react';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate() {
    console.log('adf');
  }

  extractContents(node) {
    let question = node.children[0];
    let subQuestion = node.children[1];
    let input = question.querySelector('input').value;
    let select = question.querySelector('select').value;
    let condition = question.querySelector('div.condition-wrapper');
    let conditional = condition.children[0];
    let conditionValue = condition.children[1];
    return({
      input: input,
      select: select,
      conditional: conditional,
      conditionValue: conditionValue,
      subQuestion: subQuestion
    })
  }

  traverseDOM(parent, currentState = {}) {
    let children = parent.children;
    children.forEach((child, idx) => (
      let question = this.extractContents(child);
      currentState.push
      this.traverseDOM(child);
    ));
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
