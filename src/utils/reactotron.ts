// @ts-nocheck
import AsyncStorage from '@react-native-community/async-storage';
import { NativeModules } from 'react-native';
import { mst } from 'reactotron-mst';
import Reactotron, {
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';

let reactotron;

let scriptHostname;

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];

  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({ name: 'Vyoo', host: scriptHostname })
    .useReactNative({
      networking: {
        ignoreUrls: /(127\.0\.0\.1|google.com|localhost|symbolicate)/,
      },
    })
    .use(
      trackGlobalErrors({
        veto: (frame) =>
          frame.fileName.indexOf('/node_modules/react-native/') >= 0,
      }),
    )
    .use(openInEditor())
    .use(mst())
    .connect();

  // Clear on JS reload
  Reactotron.clear();

  const getPreview = (args: any[]) => {
    let preview = null;
    try {
      preview =
        args.length === 1 && typeof args[0] === 'string'
          ? args[0]
          : JSON.stringify(args);
    } catch (e) {
      // ignored
    }
    return preview;
  };

  // Redirect console logs into reactotron
  const consoleLog = console.log;
  console.log = (...args: any[]) => {
    consoleLog(...args);

    Reactotron.display({
      name: 'CONSOLE.LOG',
      important: true,
      value: args,
      preview: getPreview(args),
    });
  };
  const consoleWarn = console.warn;
  console.warn = (...args: any[]) => {
    consoleWarn(...args);

    Reactotron.display({
      name: 'CONSOLE.WARN',
      important: false,
      value: args,
      preview: getPreview(args),
    });
  };
  const consoleError = console.error;
  console.error = (error: Error) => {
    consoleError(error);
    Reactotron.error(error, error?.stack);
  };

  // Shorthand so that we dont have to import Reactotron every time we
  // want to log something
  console.tron = Reactotron.logImportant;

  // Shorthand for benchmarking
  console.bench = Reactotron.benchmark;

  // Bringing back console.count to reactotron
  console.count = (() => {
    const counter = {};
    return (label: string, print = true) => {
      const count = (counter[label] = (counter[label] || 0) + 1);
      if (print) {
        Reactotron.logImportant(`${label}: ${count}`, counter);
      }
      return count;
    };
  })();

  // Custom commands
  Reactotron.onCustomCommand({
    command: 'Log AsyncStorage',
    handler: () => {
      // eslint-disable-next-line handle-callback-err
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(
          keys.filter((key) => !key.startsWith('persist')),
          (error, stores) => {
            stores.map((result, i, store) => {
              let objectOrString = store[i][1];
              try {
                objectOrString = JSON.parse(store[i][1]);
              } catch (e) {
                // ignored
              }
              const key = store[i][0];
              console.tron(key, objectOrString);
              return true;
            });
          },
        );
      });
    },
    description:
      'Logs async storage contents, except those that begin with persist',
  });
  Reactotron.onCustomCommand({
    command: 'Show Count',
    handler: () => {
      console.count('Show Count', true);
    },
    description: 'Logs all numbers counted with console.count',
  });
}

export default reactotron;
