import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import './src/utils/reactotron';
import App from './src/containers/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
