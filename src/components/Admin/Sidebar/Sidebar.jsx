/* eslint-disable prefer-destructuring */
import React from 'react';
import { Menu, Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sider = Layout.Sider;

class Sidebar extends React.Component {
  state = {
    collapsed: false,
  }
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" >
          <NavLink activeStyle={{ color: 'white', textDecoration: 'none' }} to="/admin/">
          后台管理
          </NavLink>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="home">
            <NavLink to="/admin/">
              <span>主页</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="1">
            <NavLink to="/admin/news"><span>消息管理</span></NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
