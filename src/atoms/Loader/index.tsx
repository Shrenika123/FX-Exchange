import React from 'react';
import { useAppContext } from '../../store';
import Styes from './loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={Styes.loader}>
      <img src='/loader.gif' width={'5%'} />
    </div>
  );
};
export default Loader;
