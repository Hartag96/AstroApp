import { createStackNavigator } from 'react-navigation-stack';
import EventScreen from "./App/Containers/Event/EventScreen";
import EventsScreen from "./App/Containers/Events/EventsView";
import CreateEventScreen from "./App/Containers/CreateEvent/CreateEventView";
import AuthorizationScreen from "./App/Containers/Authorization/AuthorizationView";
import SettingsScreen from "./App/Containers/Settings/SettingsView";
import { createAppContainer } from 'react-navigation';

const NavigationStack = createStackNavigator({
    Authorization: {screen: AuthorizationScreen },
    Event: { screen: EventScreen },
    Events: {screen: EventsScreen },
    CreateEvent: {screen: CreateEventScreen },
    Settings : {screen: SettingsScreen}
});

const AppNavigator = createAppContainer(NavigationStack);
export default AppNavigator;
