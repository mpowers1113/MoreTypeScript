import React, { FC } from 'react';
import { Child } from './Child';

export const Parent: FC = () => {
  return (
    <div>
      <div>
        <h1>This is the parent</h1>
        <br></br>
        <Child color={'blue'} />
      </div>
    </div>
  );
};
