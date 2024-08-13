module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.ts'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-native-animated|react-native-wagmi-charts|react-redux|react-navigation|@react-native|@react-native-community|@react-navigation/.*)"
  ]
};
