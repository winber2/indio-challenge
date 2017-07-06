import React from 'react';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    this.props.addQuestion();
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

export default AddQuestion;
