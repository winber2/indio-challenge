import React from 'react';
import Tabs from './navigation/tabs';
import AddQuestion from './question/add_question';
import Question from './question/question';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 'create', questions: [], key: 0 };
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    let questions = this.state.questions;
    questions.push(<Question key={this.state.key} />);
    this.setState({ questions: questions, key: this.state.key += 1})
  }

  render() {
    return(
      <div className="form-builder">
        <div className="navigation">
          <div className="header-background">
            <h1>Form Builder</h1>
            <Tabs />
          </div>
        </div>
        <main className="form">
        </main>
        <ul className="questions">
          {this.state.questions}
        </ul>
        <AddQuestion addQuestion={this.addQuestion} />
      </div>
    )
  }
}

export default Root;
