import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import {ScaleUsingViewWidth, ScaleFont} from '../Helper/DetermineFontScale';
import { Colors } from '../Themes/Colors';
import { Fonts } from '../Themes/Fonts';

const { width } = Dimensions.get('window');

class OfflineStatus extends Component {
  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected: true });
    } else {
      this.setState({ isConnected: false });
    }
  };
  
  render() {
    if (!this.state.isConnected) {
      let styles = StyleSheet.create({
        offlineContainer: {
          backgroundColor: Colors.red,
          height: ScaleUsingViewWidth(0.08),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: ScaleUsingViewWidth(1.0),
          position: 'absolute',
          top: ScaleUsingViewWidth(this.props.top)
        },
        offlineText: { 
          fontSize: ScaleFont(11.0),
          fontFamily: Fonts.mediumFont,
          color: '#fff'
        }
      });

      return (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>  
      );
    }
    return null;
  }
}

export default OfflineStatus;