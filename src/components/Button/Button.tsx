import React from 'react';
import './button.scss';
import * as _ from 'lodash';
import { ButtonProps } from '../../types';

const Button = ({ buttons }: ButtonProps) => {
  const { buttonNames } = buttons;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // в ТЗ нет задачи для кнопок
  };

  return (
    <>
      {buttonNames.map((btn: string) => (
        <button
          type="button"
          onClick={handleClick}
          className="post__button"
          key={_.uniqueId()}
        >
          {btn}
        </button>
      ))}
    </>
  );
};

export default Button;
