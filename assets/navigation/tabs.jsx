import React from 'react';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { create: 'active', preview: '', export: ''};
  }

  handleClick(prop) {
    return () => {
      this.setState({ create: '', preview: '', export: '' });
      this.setState({ [prop]: 'active' });
    };
  }

  render() {
    return(
      <nav>
        <li onClick={this.handleClick('create')}>
          Create
          <div className={this.state.create} />
        </li>
        <li onClick={this.handleClick('preview')}>
          Preview
          <div className={this.state.preview} />
        </li>
        <li onClick={this.handleClick('export')}>
          Export
          <div className={this.state.export} />
        </li>
      </nav>
    )
  }
}

export default Tabs;
