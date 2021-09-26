import React from 'react';
import Colors from '../config/Colors';
import {Tabs, Tab} from 'native-base';
import {NBIcon as Icon} from './nativeBase';

/**
 *(to use multiple tabs)
 *@param  :props
 *@return :view
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
export const UseTabs = (props) => {
  return <Tabs {...props} />;
};
/**
 *(to use tab)
 *@param  :props
 *@return :view
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
export const UseTab = (props) => {
  return <Tab {...props} />;
};

/**
 *(to use icon)
 *@param  :props
 *@return :icon
 *@created by    :albin
 *@modified by   :albin
 *@modified date :26/09/21
 */
export const HeaderIcon = (props) => {
  return <Icon {...props} />;
};
