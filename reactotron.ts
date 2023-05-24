import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

Reactotron?.setAsyncStorageHandler?.(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: {veto: () => false}, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect(); // let's connect!

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args: any[]) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args.length === 1 ? args[0] : args,
    preview: JSON.stringify(args),
  });
};
