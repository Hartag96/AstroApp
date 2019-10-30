import { createStackNavigator } from 'react-navigation-stack';
import RootScreen from "./App/Containers/Root/RootScreen";
import RegistrationScreen from "./App/Containers/Registration/RegistrationScreen";
import { createAppContainer } from 'react-navigation';

const NavigationStack = createStackNavigator({
    Login: { screen: RootScreen },
    Register: { screen: RegistrationScreen },
});

const AppNavigator = createAppContainer(NavigationStack);
export default AppNavigator;
