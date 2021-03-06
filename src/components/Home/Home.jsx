import React from 'react';
import { Button, Carousel, Checkbox, InputItem, List, NavBar, WhiteSpace,
  WingBlank, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import CitySelect from '@/CitySelect';
import PropTypes from 'prop-types';
import { MobileNumberValidator } from '@/commons/validators';
import './Home.scss';

const { Item } = List;
const { AgreeItem } = Checkbox;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      isNewCar: false,
      ifShowSelectCity: false,
    };
  }


    onShowCitySelect = () => {
      this.setState({
        ifShowSelectCity: true,
      });
    };

    onHideCitySelect = () => {
      this.setState({
        ifShowSelectCity: false,
      });
    };

    onChooseCity = (city) => {
      this.setState({
        ifShowSelectCity: false,
        city,
      });
    };

    /**
     * 根据是否新车，变更车牌Input的状态
     * @param {boolean} status
     */
    onTogglePlateStatus = (status) => {
      this.setState({
        isNewCar: status,
      });
    };


    render() {
      const { getFieldProps, getFieldError } = this.props.form;
      const { ifShowSelectCity, city, isNewCar } = this.state;
      return (
        <div className="home-component">
          {!ifShowSelectCity &&
          <div>
            <NavBar
              mode="dark"
              icon={<i className="fa fa-home fa-2x" />}
            >
            买车险
            </NavBar>
            <Carousel className="carousel">
              <a href="" style={{ height: 190 }}>
                <img
                  alt="宣传图"
                  src={`${process.env.PUBLIC_URL}/static/images/newbanner.jpg`}
                  height="190px"
                />
              </a>
            </Carousel>
            <List className="my-list">
              <Item
                onClick={this.onShowCitySelect}
                extra={
                  <div>
                    <span>{city.city || '点击选择城市'}</span>
                  </div>
              }
              >
              行驶城市
              </Item>
              <InputItem
                disabled={isNewCar}
                placeholder="请输入车牌号"
                {...getFieldProps('plateNumber', {
                rules: [
                  { required: true, message: '字段必填' },
                ],
              })}
                error={!!getFieldError('plateNumber')}
                extra={
                  <AgreeItem
                    onChange={(event) => {
                    this.onTogglePlateStatus(event.target.checked);
                  }}
                  >
                  新车未上牌
                  </AgreeItem>
                            }
                className="input-with-extra"
              >
              车牌号码
              </InputItem>
              <InputItem
                {...getFieldProps('phoneNumber', {
                rules: [
                  { required: true, message: '字段必填' },
                  { validator: MobileNumberValidator },
                ],
              })}
                error={!!getFieldError('phoneNumber')}
                onErrorClick={() => { Toast.fail(getFieldError('phoneNumber')[0], 1.5); }}
                placeholder="请输入手机号码"
                extra={
                  <Button size="small">
                  获取验证码
                  </Button>
              }
                className="input-with-extra"
              >
              手机号码
              </InputItem>
              <InputItem placeholder="请输入验证码">
              验证码
              </InputItem>
              <Item extra={
                <span>试试
                <Link
                  to={{
                    pathname: '/fast-price',
                  }}
                >
                  保费估算
                </Link>
                </span>}
              >
                <span />
              </Item>
            </List>
            <WhiteSpace size="xl" />
            <WingBlank size="lg">
              <Button type="primary">查看可用套餐</Button>
            </WingBlank>
          </div>
        }
          {ifShowSelectCity &&
          <CitySelect
            onClickBack={this.onHideCitySelect}
            onChooseCity={this.onChooseCity}
          />
        }
        </div>
      );
    }
}
Home.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
};
export default createForm()(Home);
