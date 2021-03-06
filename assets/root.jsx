import React from 'react';
import Tabs from './navigation/tabs';
import AddQuestion from './question/add_question';
import Question from './question/question';
import Preview from './question/preview';
import Export from './question/export';

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
    this.saveData = this.saveData.bind(this);
    this.importData = this.importData.bind(this);
  }

  componentDidMount() {
    let questions = JSON.parse(localStorage.getItem('questions'));
    if (questions) this.importData(questions);
  }

  importData(questions) {
    this.state.questions = [];
    for (let key in questions) {
      this.state.questions.push(
        <Question key={this.state.key} keyProp={this.state.key}
          parent={this}
          isImported={true}
          conditional={questions[key].conditional}
          conditionValue={questions[key].conditionValue}
          question={questions[key].question}
          type={questions[key].type}
          subQuestions={questions[key].subQuestions}
          saveData={this.saveData}/>
      );
      this.state.key += 1
    }
    this.forceUpdate();
  }

  saveData() {
    if (this.state.create === 'active' || this.state.export === 'active') {
      this.setState({ create: '', preview: '', export: '' });
      this.setState({ create: 'active' });
    }
  }

  handleClick(prop) {
    return () => {
      this.setState({ create: '', preview: '', export: '' });
      this.setState({ [prop]: 'active' });
    };
  }

  addQuestion() {
    let questions = this.state.questions;
    questions.push(
      <Question saveData={this.saveData}
        key={this.state.key}
        keyProp={this.state.key}
        parent={this} />
    );
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
            <Export importData={this.importData} saveData={this.saveData} />
          </main>
        </section>
      </div>
    )
  }
}

export default Root;
