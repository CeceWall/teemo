/* eslint-disable import/prefer-default-export */
/**
 * async-validator 的手机号验证
 * @param rule
 * @param {string} phoneNumber
 * @param {Function} callback
 * @return {undefined}
 */
export const MobileNumberValidator = (rule, phoneNumber, callback) => {
  let error;
  if (!phoneNumber) {
    error = new Error('字段必填');
  }
  if (phoneNumber.length !== 11) {
    error = Error('请输入11位手机号');
  }
  if (!/^1[3|4|5|7|8][0-9]{9}$/.test(phoneNumber)) {
    error = new Error('请输入正确的手机号');
  }
  callback(error);
};

