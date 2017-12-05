import React from 'react';
import { Breadcrumb, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFetchingStatus } from 'src/utils';
import PropTypes from 'prop-types';
import * as actions from './actions';
import NewsForm from './forms/NewsForm';

class EditNews extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { match, getNews, history } = this.props;
    const { id } = match.params;
    getNews(id).catch((e) => {
      if (e.response.status === 404) {
        history.push('/not-found');
      } else {
        message.error(e.message);
      }
    });
  }

  async handleFormSubmit(news) {
    const { match, history } = this.props;
    const { id } = match.params;
    const { editNews } = this.props;
    try {
      await editNews({ ...news, id });
      message.success('修改成功');
      history.push('/admin/news');
    } catch (e) {
      message.error(e.message);
    }
  }

  render() {
    const { fetching, news } = this.props;
    return (
      <div className="edit-news-component">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/admin/news">消息管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>编辑消息</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={fetching}>
          <NewsForm
            onSubmitNews={this.handleFormSubmit}
            title={news.title}
            content={news.content}
          />
        </Spin>
      </div>
    );
  }
}

EditNews.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  fetching: PropTypes.bool,
  getNews: PropTypes.func.isRequired,
  editNews: PropTypes.func.isRequired,
};

EditNews.defaultProps = {
  news: { title: '', content: '' },
  fetching: false,
};

const mapStateToProps = (state) => {
  const { newsManage } = state;
  return {
    news: newsManage.news,
    fetching: getFetchingStatus(state, actions.getNews),
  };
};
const mapDispatchToProps = dispatch => ({
  getNews: id => dispatch(actions.getNewsAsync(id)),
  editNews: news => dispatch(actions.editNewsAsync(news)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNews);
