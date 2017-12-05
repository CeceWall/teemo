import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import VisualContent from './VisualContent';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },

  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class NewsForm extends React.Component {
  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onFormSubmit(event) {
    event.preventDefault();
    const { validateFields } = this.props.form;
    const { onSubmitNews } = this.props;
    validateFields(async (errors, values) => {
      if (errors) {
        return;
      }
      onSubmitNews(values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, content } = this.props;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Item label="消息标题" {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [{ required: true, message: '标题必填' }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="消息内容" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: content,
          })(<VisualContent />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </Form.Item>
      </Form>
    );
  }
}

NewsForm.propTypes = {
  form: PropTypes.shape().isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  onSubmitNews: PropTypes.func.isRequired,
};

NewsForm.defaultProps = {
  title: '',
  content: '',
};

export default Form.create()(NewsForm);
