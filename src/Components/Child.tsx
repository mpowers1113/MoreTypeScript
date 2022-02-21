import React, { FC } from 'react';

interface ChildProps {
  color: string;
}

export const Child: FC<ChildProps> = ({ color }) => {
  return (
    <div>
      <h1>{color}</h1>
    </div>
  );
};
