import classNames from 'classnames';
import React from 'react';
import Styes from './loader.module.scss';

interface LoaderProps {
  className?: any;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames(Styes.loader, className ? className : '')}>
      <img src='/loader.gif' width={'5%'} />
    </div>
  );
};
export default Loader;
