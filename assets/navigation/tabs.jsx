import React from 'react';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleClick(prop) {
  //   return () => {
  //     this.setState({ create: '', preview: '', export: '' });
  //     this.setState({ [prop]: 'active' });
  //   };
  // }

  render() {
    return(
      <nav>
        <li onClick={this.props.handleClick('create')}>
          Create
          <div className={this.props.create} />
        </li>
        <li onClick={this.props.handleClick('preview')}>
          Preview
          <div className={this.props.preview} />
        </li>
        <li onClick={this.props.handleClick('export')}>
          Export
          <div className={this.props.export} />
        </li>
      </nav>
    )
  }
}

export default Tabs;
