import React from 'react';
import PropTypes from 'prop-types';

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

export default App;