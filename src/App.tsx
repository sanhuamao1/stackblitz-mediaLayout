import { FC } from 'react';
import MediaLayout from './MediaLayout';
import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <MediaLayout />
    </div>
  );
};
