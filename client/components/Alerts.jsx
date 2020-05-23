import React from 'react';


console.log('wtfff')
const Alerts = ({ message, type }) => {
  console.log('==alerts', message, type)
  return (
    <div>
      {(type == 200) ?
        <div class="alert alert-success" role="alert">{message}</div> :
        <div class="alert alert-danger" role="alert">{message}</div>
      }
    </div>
  )
}

export default Alerts;
