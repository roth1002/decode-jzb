import React from 'react';
import ReactJson from 'react-json-view';
import base64js from 'base64-js';
import pako from 'pako';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      src: { roth: '帥' },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({value: event.target.value});
    try {
      const unpaddedJzbString = value.substr( 0, value.length - ( value.length % 4 ) );
      const byteArray = base64js.toByteArray(unpaddedJzbString);
      const jsonStr = pako.inflate( byteArray, { to: 'string' } );
      this.setState({ src: JSON.parse(jsonStr) });
    } catch(e) {
      console.log(e);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            jzb:
            <textarea style={{ width: '100%', height: '200px' }} value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
        <ReactJson
          src={this.state.src}
          displayObjectSize={false}
          displayDataTypes={false}
          theme="apathy:inverted"
        />
    </div>
    );
  }
}

export default App;
