import {Dimensions, NativeModules, Platform} from 'react-native';
const { PlatformConstants } = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;
const Device = require('react-native-device-detection');

let fontScale = 1.0;
let viewWidth = Dimensions.get('window').width;

export function DetermineFontScale() {
    fontScale = 1.0;

    if (Dimensions.get('window').width < Dimensions.get('window').height) {
        viewWidth = Dimensions.get('window').width;
        // Redmi 5 Android Portrait 68mm screen, text: 31mm, 0.45
        // iPhone 7 iOS Portrait 58mm screen, text: 26mm, 0.45
        // Default fontScale 1.0

        if (deviceType === 'pad') {
            // Apple iPad iOS Portrait 148mm screen, text: 67mm, 0.45
            fontScale = 2.0;
        } else if (Device.isTablet) {
            // Lenovo Android Portrait 118mm screen, text: 53mm, 0.45
            fontScale = 1.44;
        }
    } else {
        // Redmi 5 Android Landscape 128mm screen, text: 58mm, 0.45
        // Apple iPhone 7 iOS Landscape 104mm screen, text: 47mm, 0.45
        viewWidth = Dimensions.get('window').height;
        fontScale = 1.9;

        if (Platform.OS === 'ios' && deviceType == 'phone') {
            fontScale = 1.8;
        } else if (deviceType === 'pad') {
            // Apple iPad iOS Landscape 196mm screen, text: 88mm, 0.45
            fontScale = 2.7;
        } else if (Device.isTablet) {
            // Lenovo Android Landscape 172mm screen, text: 77mm, 0.45
            fontScale = 2.12;
        }
    }

    return fontScale;
};

export function ScaleFont(fontSize) {
    return fontSize * fontScale;
};

export function ScaleUsingViewWidth(width) {
    return width * Dimensions.get('window').width;
};

export function ScaleUsingAspectRatio(width) {
    let aspectRatio = Dimensions.get('window').height / Dimensions.get('window').width;
    if (aspectRatio > 1.6) {
        return ScaleUsingViewWidth(width) * 2.5;
    } else {
        return ScaleUsingViewWidth(width);
    }
};
