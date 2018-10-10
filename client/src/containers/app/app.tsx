import * as React from 'react';

import Layout from 'src/containers/layout/layout';
import * as classes from './app.scss';
import Counter from 'src/components/counter';

class App extends React.Component {
  public state = {
    response: []
  };

  public componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <>
        <Layout />
        <p>{this.state.response.map((x: any, i) => <div key={i}>{x.name}</div>)}</p>
      </>
    );
  }

  private callApi = async () => {
    const response = await fetch('/api/product');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
}

export default App;
