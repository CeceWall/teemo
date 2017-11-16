import React from 'react';

class PriceTable extends React.Component {

  componentDidMount() {
    const {location, history} = this.props;
    console.log(location);
    if (!location.state) {
      history.replace('/fast-price')
    }
  }

  render() {
    return (
      <div>
        bla
      </div>
    )
  }
}

export default PriceTable;