import React from 'react';
import Tabs from './navigation/tabs';
import AddQuestion from './question/add_question';
import Question from './question/question';
import Preview from './question/preview';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'create',
      questions: [],
      key: 0,
      create: 'active',
      preview: '',
      export: ''
    };
    this.addQuestion = this.addQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(prop) {
    return () => {
      this.setState({ create: '', preview: '', export: '' });
      this.setState({ [prop]: 'active' });
    };
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
            <Tabs handleClick={this.handleClick}
              create={this.state.create}
              preview={this.state.preview}
              export={this.state.export}/>
          </div>
          <figure />
        </div>
        <section>
          <main className={`question ${this.state.create}`}>
            <ul className="questions">
              {this.state.questions}
            </ul>
            <AddQuestion addQuestion={this.addQuestion} />
          </main>
          <main className={`preview ${this.state.preview}`}>
            <Preview />
          </main>
          <main className={`export ${this.state.export}`}>
            export
          </main>
        </section>
      </div>
    )
  }
}

export default Root;
