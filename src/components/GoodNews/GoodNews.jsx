import React from 'react';
import { connect } from 'react-redux';
import { ActionSheet, NavBar, Button, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import { MobileNumberValidator } from '@/commons/validators';
import * as actions from './actions';
import ContactModal from './ContactModal';

const ContactWays = ['微信预约', '手机预约', '取消'];


class GoodNews extends React.Component {
  state={
    showModal: false,
    contactIndex: 0,
    modalPlaceHolder: '',
    modalTitle: '',
    contact: '',
    modalRules: [],
  };
  componentDidMount() {
    const { match, getNews } = this.props;
    const { id } = match.params;
    getNews(id);
  }

  onConfirmContact=() => {
    const { contactIndex } = this.state;
    if (contactIndex === 1) {
      console.log(1);
    }
    this.setState({
      contact: '',
      showModal: false,
    });
  };

  onChooseContact=(index) => {
    let modalPlaceHolder = '';
    let modalRules = [];
    switch (index) {
      case 0:
        modalPlaceHolder = '请输入微信号';
        break;
      case 1:
        modalPlaceHolder = '请输入手机号';
        modalRules = [{ validator: MobileNumberValidator }];
        break;
      default:
        return;
    }
    this.setState({
      contactIndex: index,
      showModal: true,
      modalTitle: ContactWays[index],
      modalPlaceHolder,
      modalRules,
    });
  };


  backToHome=() => {
    const { history } = this.props;
    history.push('/');
  };
  showContactSheet=() => {
    ActionSheet.showActionSheetWithOptions({
      options: ContactWays,
      destructiveButtonIndex: ContactWays.length - 1,
      message: '请选择预约方式',
      maskClosable: true,
    }, this.onChooseContact);
  };

  render() {
    const { news } = this.props;
    const {
      showModal, contact, modalTitle, modalPlaceHolder,
      modalRules,
    } = this.state;
    return (
      <div>
        <ContactModal
          title={modalTitle}
          visible={showModal}
          inputValue={contact}
          inputPlaceHolder={modalPlaceHolder}
          rules={modalRules}
          onPressCancel={() => this.setState({
            showModal: false,
          })}
          onPressOk={this.onConfirmContact}
        />
        <NavBar
          mode="dark"
          icon={<i className="fa fa-home fa-2x" aria-hidden="true" />}
          onLeftClick={this.backToHome}
        >
          {news.title}
        </NavBar>
        <div className="content" dangerouslySetInnerHTML={{ __html: news.content }} />
        <div>
          <WingBlank mode="md">
            <Button type="primary" onClick={this.showContactSheet}>预约业务员</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}

GoodNews.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  getNews: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};


const mapStateToProps = (state) => {
  const { goodNews } = state;
  return {
    news: goodNews.news,
  };
};

const mapDispatchToProps = dispatch => ({
  getNews: (id) => {
    dispatch(actions.getNewsAsync(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoodNews);
