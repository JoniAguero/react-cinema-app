import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Tab = (props: any) => {
  const { activeTab, label, onClick } = props;
  const [className, setClassName] = useState('tab-list-item');

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prev) => (prev += ' tab-list-active'));
    } else {
      setClassName('tab-list-item');
    }
  }, [activeTab, label]);

  const onTabClick = () => {
    onClick(label);
  };

  return (
    <>
      <li className={className} onClick={onTabClick}>
        {label}
      </li>
    </>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default Tab;