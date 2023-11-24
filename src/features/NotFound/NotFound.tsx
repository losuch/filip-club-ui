import React from 'react';

const NotFound = ({ error = 'Something is wrong!' }) => {
  return (
    <div
      style={{
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div>Opps! 😢</div>

      <div>{error}</div>
    </div>
  );
};

export default NotFound;
