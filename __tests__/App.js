import 'react-native';
import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../src/navigation/AppNavigator', () => 'AppNavigator');

describe('App', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`renders the loading screen`, () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders the root without loading screen`, () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
