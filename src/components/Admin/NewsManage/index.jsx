import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoMatch from '@/NoMatch';
import CreateNewsComponent from './CreateNews';
import NewsListComponent from './NewList';
import EditNewsComponent from './EditNews';

function NewsManage(props) {
  const { match } = props;
  return (
    <div className="news-component" >
      <Switch>
        <Route exact path={`${match.url}`} component={NewsListComponent} />
        <Route path={`${match.url}/create`} component={CreateNewsComponent} />
        <Route path={`${match.url}/:id/edit`} component={EditNewsComponent} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

NewsManage.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default NewsManage;
