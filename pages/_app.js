import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import '../styles/global.css';
import wrapper from '../store/configureStore';

const App = ({Component}) => {
    return (
        <>
            <Component />
        </>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);