import React from 'react';
import PropTypes from 'prop-types';

class PriceTable extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (!location.state) {
      history.replace('/fast-price');
    }
  }

  render() {
    return (
      <div>
          bla
      </div>
    );
  }
}

PriceTable.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default PriceTable;
