import React from 'react';
import { ActivityIndicator, List, NavBar, SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import * as actions from './actions';
import './CitySelect.scss';

const { Item } = List;

class CitySelect extends React.Component {
  constructor() {
    super();
    this.state = {
      ifShowSearchList: false,
    };
  }

  componentDidMount() {
    const { getCurrentPosition } = this.props;
    getCurrentPosition();
  }

  onLeftBack = () => {
    const { onClickBack } = this.props;
    if (onClickBack) {
      onClickBack();
    }
  };

  onInputSearch = (keyword) => {
    const { searchCities } = this.props;
    if (keyword) {
      searchCities(keyword);
    }
  };

  handleChooseCity = (city) => {
    const { onChooseCity } = this.props;
    if (onChooseCity) {
      onChooseCity(city);
    }
  };

  render() {
    const { cities, cityInfo } = this.props;
    const { ifShowSearchList } = this.state;
    return (
      <div className="city-select-component">
        <NavBar
          mode="dark"
          icon={<i className="fa fa-angle-left fa-2x" aria-hidden="true" />}
          onLeftClick={this.onLeftBack}
        >
          城市选择
        </NavBar>
        <SearchBar
          placeholder="输入城市名称、首字母、拼音"
          onFocus={() => {
            this.setState({ ifShowSearchList: true });
          }}
          onCancel={() => {
            this.setState({ ifShowSearchList: false });
          }}
          onChange={this.onInputSearch}
        />
        {ifShowSearchList &&
        <List>
          {cities.map(city => (
            <Item
              key={city.city}
              onClick={() => this.handleChooseCity(city)}
            >
              {city.city}
            </Item>
          ))}
        </List>
        }
        {!ifShowSearchList &&
        <div>
          <WingBlank size="lg">
            <WhiteSpace size="md" />
            {!cityInfo.success &&
            <div>
              <div className="sub-title">
                <span style={{ marginRight: 12 }}>正在定位...</span>
                <ActivityIndicator animation />
              </div>
            </div>
            }
            {!cityInfo.success &&
            <div>
              <p>{cityInfo.message}</p>
            </div>
            }
            {
              cityInfo.result &&
              <div>
                <p className="sub-title">当前城市</p>
                <div className="result-city">
                  <button onClick={this.handleChooseCity} style={{ height: '100%', width: '100%' }}>
                    {cityInfo.result.city}
                  </button>
                </div>
              </div>
            }
          </WingBlank>
        </div>
        }
      </div>
    );
  }
}

CitySelect.propTypes = {
  cities: PropTypes.arrayOf().isRequired,
  cityInfo: PropTypes.shape().isRequired,
  searchCities: PropTypes.func.isRequired,
  getCurrentPosition: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onChooseCity: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  searchCities: (keyword) => {
    dispatch(actions.searchCitiesAsync(keyword));
  },
  getCurrentPosition: () => {
    dispatch(actions.getCityNameAsync());
  },
});

const mapStateToProps = (state) => {
  const { citySelect } = state;
  return {
    cities: citySelect.cities,
    cityInfo: citySelect.cityInfo,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CitySelect));
