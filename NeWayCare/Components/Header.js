import React from 'react';
import { StyleSheet} from 'react-native';
import { Header, Body, Icon, Text} from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons';

export default class Videos extends React.Component {
 

  render() {
    return (
    <Header>
      {this.props.home? 
      <Icon name="home" onPress={() => this.props.navigation.navigate("Home")} style={{color:"white", top:15, left: 5}}/>
          :<Icon name="settings" onPress={() => this.props.navigation.navigate("Settings")} style={{color:"white", top:15, left: 5}}/>}
       <Body style={{alignItems: "center"}}>
            <Text style={{color: "white", fontSize:20}}>{this.props.title}</Text>
          </Body>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, right: 5}}/>
        </Header>      
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
  }
});


