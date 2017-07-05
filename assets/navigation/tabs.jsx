import React from 'react';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <nav>
        <li>Create</li>
        <li>Preview</li>
        <li>Export</li>
      </nav>
    )
  }
}

export default Tabs;
