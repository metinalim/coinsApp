import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/commonStyles';

export type XLabel = {
  time: string;
  day: string;
}

const XLabelsView = ({ xLabels, width }: { xLabels: XLabel[], width: number }) => {
  return (
    <View style={[styles.labelsView, { width: width }]}>
      <View style={styles.labelsViewInner}>
        {xLabels.map((label, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: index === 0 ? 'flex-start' : (index === xLabels.length - 1) ? 'flex-end' : 'center',
            }}>
            <View style={styles.labelView}></View>
            <Text>{label.time}</Text>
            <Text>{label.day}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default XLabelsView;