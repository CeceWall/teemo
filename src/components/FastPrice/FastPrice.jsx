import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile'
import InsureForm from './InsureForm';
import PriceTable from './PriceTable';
import './FastPrice.scss';

class FastPrice extends React.Component {

    constructor() {
        super();
    }

    onGoBack = () => {
        const {history} = this.props;
        history.goBack();
    };


    render() {
        const {match} = this.props;
        return (
            <div className="fast-price-component">
                <NavBar icon={<i className="fa fa-angle-left fa-2x" aria-hidden="true"/>}
                    onLeftClick={this.onGoBack}
                >
                    车险估价
                </NavBar>
                <Route exact path={match.url} component={InsureForm}/>
                <Route path={`${match.url}/calc`} component={PriceTable}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(FastPrice);