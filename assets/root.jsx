import React from 'react';
import Tabs from './navigation/tabs';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: 'create' };
  }

  render() {
    return(
      <div className="form-builder">
        <h1>Form Builder</h1>
        <main className="form">
          <Tabs />
        </main>
      </div>
    )
  }
}

export default Root;
