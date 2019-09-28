import React from 'react';
import {Badge} from "antd";

const FilterControl = ({isActive, children, count, onChange}) => {
  let className = 'spravka__header__list__item';
  let badgeBackgroundColor = isActive ? '#030532' : '#F5F5F5';
  let badgeTextColor = isActive ? '#fff' : '#6C6C6C';
  className = isActive ? `${className} ${className}_active` : className;


  return (
    <li className={className} onClick={onChange}>
      <p className='spravka__header__list__item__text'>{children}</p>
      <Badge count={count} style={{backgroundColor: badgeBackgroundColor, color: badgeTextColor}} />
    </li>
  );
};

export default FilterControl;