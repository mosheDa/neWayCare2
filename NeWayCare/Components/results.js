import React from 'react';
import { StyleSheet,BackHandler } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text} from "native-base";
import { strings } from '../locales/i18n';
import Header from "./Header" 

export default class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  state = { fileds: [],isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

   componentDidMount() {
    this.getFileds()
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.props.navigation.navigate("Home");
      return true;
  }

  render() {
    return (
      <Container>
          <Header navigation={this.props.navigation} title={strings('labels.results')}/>
            <Content style={{top: 150}}>
            <Card>
                <CardItem>
                <Body>
                <Text style={{fontSize: 50, alignSelf: "center", justifyContent:"center"}}>{strings('results.emptyMsg')}</Text>
                </Body>
                </CardItem>
            </Card>
            </Content>
        </Container>
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
