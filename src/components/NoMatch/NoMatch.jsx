import React from 'react';
import { NavBar, Button, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';

function NoMatch(props) {
  const { history } = props;
  return (
    <div>
      <NavBar icon={<i className="fa fa-home fa-2x" aria-hidden="true" />}>页面去火星了</NavBar>
      <img
        alt="页面不存在"
        src={`${process.env.PUBLIC_URL}/static/images/not_found_bg.png`}
        width="100%"
      />
      <div style={{ marginTop: 20 }} />
      <WingBlank mode="lg">
        <Button
          type="primary"
          onClick={() => { history.replace('/'); }}
        >
          返回首页
        </Button>
      </WingBlank>
    </div>
  );
}

NoMatch.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default NoMatch;
