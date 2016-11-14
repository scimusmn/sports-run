import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { FinishContainer } from '../../ui/pages/finish';
import { SelectionContainer } from '../../ui/pages/selection';
import { Index } from '../../ui/pages/index';
import { NotFound } from '../../ui/pages/not-found';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={ App }>
        <IndexRoute name='index' component={ Index } />
        <Route name='finish' path='/finish' component={ FinishContainer } />
        <Route name='selection' path='/selection' component={ SelectionContainer } />
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
