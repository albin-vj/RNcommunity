import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../config/Colors';
import {HeaderIcon} from './GeneralComponents';
import Strings from '../config/Strings';

//HeaderView
export const HeaderView = (props) => {
  return (
    <View style={headerViewStyle.container}>
      <TouchableOpacity style={headerViewStyle.iconContainer}>
        <HeaderIcon
          style={headerViewStyle.iconStyle}
          name={'menu'}
          type={'MaterialIcons'}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.white}}>{Strings.landingPageHeader}</Text>
      </View>
      <TouchableOpacity style={headerViewStyle.iconContainer}>
        <HeaderIcon
          style={headerViewStyle.iconStyle}
          name={'notifications-none'}
          type={'MaterialIcons'}
        />
      </TouchableOpacity>
    </View>
  );
};

const headerViewStyle = StyleSheet.create({
  container: {
    height: Dimensions.get('window').width * 0.2,
    width: '100%',
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  iconStyle: {
    color: Colors.white,
    fontSize: Dimensions.get('screen').width * 0.07,
  },
});
