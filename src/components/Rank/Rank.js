import React from 'react';

const Rank = ({ name, is_admin }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, welcome you are `}
      </div>
      <div className='white f1'>
        {(is_admin)?"admin":"user" }
      </div>
    </div>
  );
}

export default Rank;