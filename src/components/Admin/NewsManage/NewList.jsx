import React from 'react';
import { Breadcrumb, Button, Table, Pagination, Popconfirm, Switch, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFetchingStatus } from 'src/utils';
import moment from 'moment';
import * as actions from './actions';
import './NewsList.scss';


class NewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      number: 1, // 当前页, 从1开始
      size: 10, // 每页条数
      publishedMap: {},
    };

    this.onPageChanged = this.onPageChanged.bind(this);
    this.onModifyNews = this.onModifyNews.bind(this);
    this.onTogglePublished = this.onTogglePublished.bind(this);
  }
  componentDidMount() {
    const { getAllNews } = this.props;
    const { number, size } = this.state;
    getAllNews(number - 1, size);
  }
  componentWillReceiveProps(nextProps) {
    const { content } = nextProps.newsList;
    const publishedMap = content.reduce((obj, item) => {
      const { id, hasPublished } = item;
      return { ...obj, [id]: !!hasPublished };
    }, {});
    this.setState({
      publishedMap,
    });
  }

  onPageChanged(number) {
    const { getAllNews } = this.props;
    this.setState({
      number,
    }, () => {
      getAllNews(number - 1);
    });
  }

  async onTogglePublished(id, published) {
    const { togglePublished } = this.props;
    const { publishedMap } = this.state;
    try {
      await togglePublished(id, published);
      this.setState({
        publishedMap: { ...publishedMap, [id]: published },
      });
    } catch (e) {
      message.error(e.message);
    }
  }

  onModifyNews(id) {
    const { history } = this.props;
    history.push(`/admin/news/${id}/edit`);
  }

  async onDeleteNews(id) {
    const { news, deleteNews, getAllNews } = this.props;
    const { number, size } = this.state;
    try {
      await deleteNews(id);
      const { totalElements } = news;
      // 如果这页没有内容了，就自动加载上一页，首页除外
      if (totalElements - 1 > 0 && (totalElements - 1) % size === 0) {
        await getAllNews(number - 2, size);
      } else {
        await getAllNews(number - 1, size);
      }
      message.success('删除成功');
    } catch (e) {
      message.error(e.message);
    }
  }


  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '发布日期',
      dataIndex: 'createdAt',
      render: text => moment(text).format('YYYY-MM-DD'),
      key: 'createdAt',
    },
    {
      title: '更新日期',
      dataIndex: 'updatedAt',
      render: text => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '已发布',
      dataIndex: 'hasPublished',
      render: (hasPublished, item) => {
        const { publishedMap } = this.state;
        return (
          <Switch
            checked={publishedMap[item.id]}
            onChange={checked => this.onTogglePublished(item.id, checked)}
          />
        );
      },
      key: 'hasPublished',
    },
    {
      title: '操作',
      key: 'Action',
      render: (text, item) => (
        <div className="action-buttons">
          <div>
            <Button size="small" onClick={() => this.onModifyNews(item.id)}>修改</Button>
          </div>
          <div>
            <Popconfirm
              title="确认删除此条新闻吗？"
              onConfirm={() => this.onDeleteNews(item.id)}
              okText="确认"
              cancelText="取消"
            >
              <Button size="small" type="danger">删除</Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  render() {
    const { newsList, fetching } = this.props;
    const { size, number } = this.state;
    return (
      <div className="news-list-component">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>消息管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary">
          <Link to="/admin/news/create">创建新消息</Link>
        </Button>
        <div style={{ marginBottom: 12 }} />
        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={newsList.content}
          pagination={false}
          loading={fetching}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <Pagination
            current={number}
            pageSize={size}
            total={newsList.totalElements}
            showTotal={total => `共${total}条`}
            onChange={this.onPageChanged}
          />
        </div>
      </div>
    );
  }
}

NewsList.propTypes = {
  newsList: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.shape()),
    last: PropTypes.bool,
    totalPages: PropTypes.number,
    totalElements: PropTypes.number,
    size: PropTypes.number,
    number: PropTypes.number,
    first: PropTypes.bool,
    numberOfElements: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  getAllNews: PropTypes.func.isRequired,
  deleteNews: PropTypes.func.isRequired,
  togglePublished: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

NewsList.defaultProps = {
  fetching: false,
};

const mapStateToProps = (state) => {
  const { newsManage } = state;
  return {
    newsList: newsManage.newsList,
    fetching: getFetchingStatus(state, actions.getAllNews) ||
    getFetchingStatus(state, actions.togglePublished),
  };
};

const mapDispatchToProps = dispatch => ({
  getAllNews: (number, size) => dispatch(actions.getAllNewsAsync(number, size)),
  deleteNews: id => dispatch(actions.deleteNewsAsync(id)),
  togglePublished: (id, published) => dispatch(actions.togglePublishedAsync(id, published)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
