import React from 'react';
import { useParams } from 'react-router-dom';
import TenantLogin from './TenantLogin';

function Modal() {
  let { id } = useParams();

  console.log(id)
  return (
    <div>
      {id === '1' && <TenantLogin />}
      {id === '2' && <div>Modal 2 Content</div>}
    </div>
  );
}

export default Modal;





