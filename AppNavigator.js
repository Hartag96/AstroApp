import { createStackNavigator } from 'react-navigation-stack';
import RootScreen from "./App/Containers/Root/RootScreen";
import HomeScreen from "./App/Containers/Home/HomeScreen";
import RegistrationScreen from "./App/Containers/Registration/RegistrationScreen";
import { createAppContainer } from 'react-navigation';

const NavigationStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: RootScreen },
    Register: { screen: RegistrationScreen }
});

const AppNavigator = createAppContainer(NavigationStack);
export default AppNavigator;
