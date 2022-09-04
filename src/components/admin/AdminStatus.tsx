import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
.item{
    border: 8px solid ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    height: 65px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}

  .active_item {
    background-color: ${(props) => props.theme.colors.blue};
  }

  .blocked_item {
    background-color: ${(props) => props.theme.colors.mustard};
  }


`;

interface Props {
  status: string
}

export const AdminStatus=({ status }:Props) => {

  const displayBlocked = () => (
    <div className="item blocked_item">
   
      <p className="text blocked_text">Blocked</p>
    </div>
  );

  const displayActive = () => (
    <div className="item active_item">
     
      <p className="text active_text">Active</p>
    </div>
  );



  return (
    <Wrapper>
      {status === 'Active' && displayActive()}
      {status === 'Blocked' && displayBlocked()}

    </Wrapper>
  );
}


export default AdminStatus;
