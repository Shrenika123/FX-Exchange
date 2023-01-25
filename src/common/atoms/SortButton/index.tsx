import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Styles from './index.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  onDecClick: () => void;
  onAscClick: () => void;
  title: string;
  className?: any;
}

const SortButton: React.FC<ButtonProps> = ({
  onDecClick,
  onAscClick,
  title,
  className,
}) => {
  return (
    <button
      className={classNames(
        Styles.sortButtonContainer,
        className ? className : ''
      )}
      disabled={true}
      data-testid='sortButton'
    >
      <div className={Styles.sortButtonContentContainer}>
        <p>{title} </p>
        <div className={Styles.buttonSortIconContainer}>
          <CaretUpOutlined onClick={onDecClick} />
          <CaretDownOutlined onClick={onAscClick} />
        </div>
      </div>
    </button>
  );
};
export default SortButton;
