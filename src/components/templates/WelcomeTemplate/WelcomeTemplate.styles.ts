import { Dimensions, StyleSheet } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginHorizontal: 16,
  },
  image: {
    width: screenWidth,
    height: screenHeight / 2,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
});
