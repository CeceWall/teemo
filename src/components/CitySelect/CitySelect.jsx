import React from 'react';
import {ActivityIndicator, Icon, List, NavBar, SearchBar, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import * as actions from './actions';
import PropTypes from 'prop-types';
import './CitySelect.scss';

const Item = List.Item;

class CitySelect extends React.Component {
    constructor() {
        super();
        this.state = {
            ifShowSearchList: false,
        }
    }

    componentDidMount() {
        const {getCurrentPosition} = this.props;
        getCurrentPosition();
    }

    onLeftBack = () => {
        const {onClickBack} = this.props;
        if (onClickBack) {
            onClickBack();
        }
    };

    onInputSearch = (keyword) => {
        const {searchCities} = this.props;
        if (keyword) {
            searchCities(keyword)
        }
    };

    handleChooseCity = (city) => {
        const {onChooseCity} = this.props;
        if (onChooseCity) {
            onChooseCity(city);
        }
    };

    render() {
        const {cities, positionStatus} = this.props;
        const {ifShowSearchList} = this.state;
        return (
            <div className="city-select-component">
                <NavBar mode="dark" icon={<Icon type="left"/>} onLeftClick={this.onLeftBack}>
                    城市选择
                </NavBar>
                <SearchBar placeholder="输入城市名称、首字母、拼音"
                           onFocus={() => {
                               this.setState({ifShowSearchList: true})
                           }}
                           onCancel={() => {
                               this.setState({ifShowSearchList: false})
                           }}
                           onChange={this.onInputSearch}
                />
                {ifShowSearchList &&
                <List>
                    {cities.map((city) => {
                        return (
                            <Item key={city.city}
                                  onClick={() => this.handleChooseCity(city)}
                            >
                                {city.city}
                            </Item>
                        )
                    })}
                </List>
                }
                {!ifShowSearchList &&
                <div>
                    <WingBlank size="lg">
                        <WhiteSpace size="md"/>
                        <div className="sub-title">
                            正在定位
                        </div>
                        <WhiteSpace size="md"/>
                        <ActivityIndicator/>
                        {JSON.stringify(positionStatus)}
                    </WingBlank>
                </div>
                }
            </div>
        )
    }
}

CitySelect.propTypes = {
    cities: PropTypes.array.isRequired,
    positionStatus: PropTypes.object.isRequired,
    searchCities: PropTypes.func.isRequired,
    getCurrentPosition: PropTypes.func.isRequired,
    onClickBack: PropTypes.func.isRequired,
    onChooseCity: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchCities: (keyword) => {
            dispatch(actions.searchCity(keyword));
        },
        getCurrentPosition: () => {
            dispatch(actions.getCurrentPosition());
        }
    }
};

const mapStateToProps = (state) => {
    const {citySelect} = state;
    return {
        cities: citySelect.cities,
        positionStatus: citySelect.positionStatus,
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CitySelect));