import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import InsureForm from './InsureForm';
import PriceTable from './PriceTable';
import './FastPrice.scss';

class FastPrice extends React.Component {
  onGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };


  render() {
    const { match } = this.props;
    return (
      <div className="fast-price-component">
        <NavBar
          icon={<i className="fa fa-angle-left fa-2x" aria-hidden="true" />}
          onLeftClick={this.onGoBack}
        >
          车险估价
        </NavBar>
        <Route exact path={match.url} component={InsureForm} />
        <Route path={`${match.url}/calc`} component={PriceTable} />
      </div>
    );
  }
}

FastPrice.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FastPrice);
