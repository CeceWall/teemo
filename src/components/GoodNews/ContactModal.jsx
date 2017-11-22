import React from 'react';
import { Modal, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import './ContactModal.scss';

function ContactModal(props) {
  const {
    title, visible, onPressCancel, onPressOk,
    inputPlaceHolder, rules,
  } = props;

  const {
    getFieldProps, getFieldError, getFieldValue, validateFields,
  } = props.form;
  return (
    <div>
      {
      visible &&
      <Modal
        visible={visible}
        title={title}
        transparent
        footer={
        [
          {
            text: '确定',
            onPress: () => {
              validateFields({ first: true, force: true }, (errors) => {
                if (errors) {
                  Toast.fail(getFieldError('input')[0]);
                  return;
                }
                const inputValue = getFieldValue('input');
                onPressOk(inputValue);
              });
            },
          },
          { text: '取消', onPress: () => onPressCancel() },
        ]
      }
      >
        <div className="good-news-contact-modal">
          <form>
            <div className="input-wrapper">
              <input
                {
                ...getFieldProps('input', {
                  rules: [
                    { required: true, message: '字段必填' },
                    ...rules,
                  ],
                })
              }
                placeholder={inputPlaceHolder}
              />
              {!!getFieldError('input') &&
              <span
                className="error-hint"
                role="button"
                tabIndex="0"
                onClick={() => Toast.fail(getFieldError('input')[0], 1.5)}
                onKeyPress={() => {
              }}
              >
                <i className="fa fa-exclamation-circle fa-lg" />
              </span>
            }
            </div>
          </form>
        </div>
      </Modal>
      }
    </div>
  );
}

ContactModal.propTypes = {
  form: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(PropTypes.object),
  inputValue: PropTypes.string.isRequired,
  inputPlaceHolder: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onPressCancel: PropTypes.func.isRequired,
  onPressOk: PropTypes.func.isRequired,
};

ContactModal.defaultProps = {
  rules: [],
};

export default createForm()(ContactModal);
