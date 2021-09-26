import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from 'native-base';
import Colors from '../config/Colors';

export const RNPicker = (props) => {
  return (
    <View>
      <Picker {...props}>
        {props.data.map((item, key) => {
          return (
            <Picker.Item
              style={{fontSize: 10}}
              label={item.label}
              value={item.value}
              key={key}
            />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
    color: Colors.red,
  },
});
