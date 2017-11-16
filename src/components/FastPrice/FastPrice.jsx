import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, DatePicker, InputItem, List, NavBar, Switch, WhiteSpace, WingBlank} from 'antd-mobile'
import {createForm} from 'rc-form';
import moment from 'moment';
import './FastPrice.scss';

const Item = List.Item;

class FastPrice extends React.Component {
    state = {
        vehiclePrice: '',
        purchaseDate: new Date(),
    };

    constructor() {
        super();
    }

    onGoBack = () => {
        const {history} = this.props;
        history.goBack();
    };

    render() {
        const {getFieldProps} = this.props.form;
        const {vehiclePrice} = this.state;
        return (
            <div className="fast-price-component">
                <NavBar icon={<i className="fa fa-angle-left fa-2x" aria-hidden="true"/>}
                        onLeftClick={this.onGoBack}
                >
                    车险估价
                </NavBar>
                <List renderHeader={() => "基础信息"}>
                    <InputItem placeholder="请输入购买价格(万元)"
                               type="money"
                               {...getFieldProps('vehiclePrice')}
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
                            initialValue: new Date(),
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
                    <Button type="primary">立即估算</Button>
                </WingBlank>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(createForm()(FastPrice)));