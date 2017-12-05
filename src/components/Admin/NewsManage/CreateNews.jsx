import React from 'react';
import { Breadcrumb, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions';
import NewsForm from './forms/NewsForm';


class CreateNews extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
  }

  async handleNewsSubmit(news) {
    const { createNews, history } = this.props;
    try {
      await createNews(news);
      history.push('/admin/news');
      message.success('创建成功');
    } catch (e) {
      message.error(e.message);
    }
  }

  render() {
    return (
      <div className="create-news-component">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/admin/news">消息管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>创建消息</Breadcrumb.Item>
        </Breadcrumb>
        <NewsForm onSubmitNews={this.handleNewsSubmit} />
      </div>
    );
  }
}

CreateNews.propTypes = {
  history: PropTypes.shape().isRequired,
  createNews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { newsManage } = state;
  return {
    newsList: newsManage.newsList,
  };
};

const mapDispatchToProps = dispatch => ({
  createNews: news => dispatch(actions.createNewsAsync(news)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CreateNews));
