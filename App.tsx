import { AppStack } from "./app/navigators/app-navigator";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./app/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppStack/>
      </SafeAreaProvider>
    </Provider>
  );
}
