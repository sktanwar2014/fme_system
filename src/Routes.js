import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Helpers
import { APP_TOKEN } from './api/Constants';
// Utils
import PageLoader from './modules/common/PageLoader';
import Franchise from './modules/auth/franchise/Franchise';
import ProductList from './modules/auth/category/ProductList';

// Routes
const AuthLayout = lazy(() => import('./modules/auth/layout/MainLayout'));
const LoginPage = lazy(() => import('./modules/public/login/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./modules/public/login/ForgotPasswordPage'));
const NoMatchPage = lazy(() => import('./modules/not-found/NoMatchPage'));
//const Appointment =lazy(( ) =>import('./api/Appointment'));


const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/login"
          render={props => {
            return APP_TOKEN.notEmpty ? <Redirect to="/auth" /> : <LoginPage {...props} />;
          }}
        />
        <Route
          exact
          path="/forgotPassword"
          render={props => {
            return APP_TOKEN.notEmpty ? <Redirect to="/auth" /> : <ForgotPasswordPage {...props} />;
          }}
        />
        <Route
          path="/auth"
          render={props => {
            return APP_TOKEN.notEmpty ? <AuthLayout {...props} /> : <Redirect to="/login" />;
            // return <AuthLayout {...props} />;
          }}
        />
        <Route component={NoMatchPage} />
       

      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  location: PropTypes.object, // React Router Passed Props
};

export default Routes;
