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
        <div className="navigation">
          <div className="header-background">
            <h1>Form Builder</h1>
            <Tabs />
          </div>
        </div>
        <main className="form">
        </main>
      </div>
    )
  }
}

export default Root;
