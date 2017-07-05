import React from 'react';
import Tabs from './navigation/tabs';
import AddQuestion from './question/add_question';
import Question from './question/question';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 'create' };
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
          <Question />
        </ul>
        <AddQuestion />
      </div>
    )
  }
}

export default Root;
