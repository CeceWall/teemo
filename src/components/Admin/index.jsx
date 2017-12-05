/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Bundle from 'src/bundle-component';
import NewsManageLoader from 'bundle-loader?lazy!./NewsManage';
import Sidebar from './Sidebar/Sidebar';

const NewsManage = props => (
  <Bundle load={NewsManageLoader}>
    {Component => <Component {...props} />}
  </Bundle>
);

const {
  Content, Footer,
} = Layout;

function AdminIndex(props) {
  const { match } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Route path={`${match.url}/news`} component={NewsManage} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

AdminIndex.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default AdminIndex;
