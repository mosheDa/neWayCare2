import React from 'react';
import { AsyncStorage} from 'react-native';
// import { Icon} from 'react-native';

import Videos from './Components/Videos';
import Intro from './Components/intro';
import Splash from './Components/splash';
import VideoFileds from './Components/VideoFileds';
import Login from './Components/login';
import Results from './Components/results';
import Settings from './Components/settings';
import { strings } from './locales/i18n';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createDrawerNavigator } from 'react-navigation';

export default class App extends React.Component {
   
  componentWillMount = () =>{
    AsyncStorage.getItem('settings', (err, settings) => {
      if(settings){
        I18n.locale = JSON.parse(settings).language;
        this.forceUpdate()
      }
    });
  }
   
  render() {
    RootStack = createDrawerNavigator({
      Home: {
        screen: Videos,
        navigationOptions: {
          drawerLabel: strings('labels.videos') ,
        }
      },
      Results: {
        screen: Results,
        navigationOptions: {
          drawerLabel: strings('labels.results')
        }
      },
      Intro: {
        screen: Intro,
        navigationOptions: {
          drawerLabel: strings('labels.intro'),
        }
      },
      Splash: {
        screen: Splash,
        navigationOptions: {
          drawerLabel: () => {},
        }
      },
      Details: {
        screen: VideoFileds,
        navigationOptions: {
          drawerLabel: () => {},
        }
      },
      Settings: {
        screen: Settings,
        navigationOptions: {
          drawerLabel: () => {},
        }
      },
      Logout: {
        screen: Login,
        navigationOptions: {
          // drawerIcon: <Icon size={20} name="logout"/>,
          drawerLabel:  strings('labels.logout'),
        }
      },
      Login: {
        screen: Login,
        navigationOptions: {
          drawerLabel: () => {},
        }
      },
    },
    {
      backBehavior:'Home',
      initialRouteName: 'Splash',
    },
    )
    return (
      <RootStack />
    );
  }
}