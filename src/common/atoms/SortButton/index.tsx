import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Styles from './index.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  onDecClick: () => void;
  onAscClick: () => void;
  title: string;
  className?: any;
  testId:string
}

const SortButton: React.FC<ButtonProps> = ({
  onDecClick,
  onAscClick,
  title,
  className,
  testId
}) => {
  return (
    <button
      className={classNames(
        Styles.sortButtonContainer,
        className ? className : ''
      )}
      disabled={true}
      data-testid={testId}
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
