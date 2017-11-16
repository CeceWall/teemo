import React from 'react';
import {createForm} from 'rc-form';
import {Button, DatePicker, InputItem, List, Switch, WhiteSpace, WingBlank} from 'antd-mobile'
import moment from 'moment';

const Item = List.Item;

class InsureForm extends React.Component {

  onSubmit = () => {
      const {getFieldsValue, getFieldsError, validateFields} = this.props.form;
      const {match, location, history} = this.props;
      // history.push('/fast-price/calc/', {some: [1, 2, 3]})
      validateFields((errors, values) => {
          if (!errors) {
              history.push('/fast-price/calc/', values);
          }
      });
  };

  render() {
      const {getFieldError, getFieldProps} = this.props.form;
      return (
          <div>
              <List renderHeader={() => "基础信息"}>
                  <InputItem placeholder="请输入购买价格(万元)"
                      type="number"
                      error={!!getFieldError('vehiclePrice')}
                      {...getFieldProps('vehiclePrice', {
                          rules: [
                              {required: true, message: '字段不能为空'}
                          ]
                      })}
                  >
            购车价格
                  </InputItem>
                  <DatePicker
                      mode="year"
                      format={(date) => {
                          return moment(date).format('YYYY');
                      }}
                      maxDate={moment().endOf('year').toDate()}
                      {...getFieldProps('purchaseDate', {
                          initialValue: moment().startOf('year').toDate(),
                      })}
                  >
                      <Item arrow="horizontal">购车时间</Item>
                  </DatePicker>
              </List>
              <List renderHeader={() => "险种搭配"}
              >
                  <Item extra={
                      <Switch disabled={true} checked={true}/>
                  }>交强险</Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('c', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })}
                      />
                  }>
            车辆损失险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('d', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })}
                      />}
                  >
            第三者责任险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('e', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })}
                      />
                  }>
            盗抢险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('f', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })}
                      />
                  }>
            车上人员责任险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('j', {
                              initialValue: true,
                              valuePropName: 'checked',
                          })
                          }
                      />
                  }>
            不计免赔率特约险
                  </Item>
              </List>
              <List
                  renderHeader={() => "其他险种"}
              >
                  <Item extra={
                      <Switch
                          {...getFieldProps('g', {
                              initialValue: false,
                              valuePropName: 'checked',
                          })
                          }
                      />
                  }>
            发动机特别损失险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('h', {
                              initialValue: false,
                              valuePropName: 'checked',
                          })
                          }
                      />
                  }>
            自燃损失险
                  </Item>
                  <Item extra={
                      <Switch
                          {...getFieldProps('i', {
                              initialValue: false,
                              valuePropName: 'checked',
                          })
                          }
                      />
                  }>
            玻璃单独破碎险
                  </Item>
              </List>
              <WhiteSpace type="xl"/>
              <WingBlank>
                  <Button type="primary" disabled={!!getFieldError('vehiclePrice')} onClick={this.onSubmit}>立即估算</Button>
              </WingBlank>
          </div>
      )
  }
}

export default createForm()(InsureForm)