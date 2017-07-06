import React from 'react';

class QuestionPreview extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
  }

  render() {
    return(
      <button onClick={this.addQuestion} className="add-question">
        <div className="circle">+</div>
        <span>Add a question!</span>
      </button>
    )
  }
}

export default QuestionPreview;
