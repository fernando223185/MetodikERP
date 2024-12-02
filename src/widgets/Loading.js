
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop: '100px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
    )

}

export default Loading;