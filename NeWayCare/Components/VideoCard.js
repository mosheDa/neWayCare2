import React from 'react';
import { ImageBackground,Image , View, Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right ,} from 'native-base';
import { strings } from '../locales/i18n';

export default class VideoCard extends React.Component {
  render() {
    return (
        <Container style={{height:"100%"}}>
            <Content>
            <Card>
                <CardItem>
                    <Left>
                    <Body style={{padding: 5}}>
                        <Text>{strings("videoCard.videoName")} : </Text>
                        {this.props.video.url ? <Text note>{JSON.parse(this.props.video.context.custom.data).videoName}</Text> : <Text note>{this.props.video.name}</Text>}
                    </Body>
                    </Left>
                    <Icon type="MaterialIcons" name="video-library" style={{right: 0}}/>
                </CardItem>
                {this.props.video.url ?
                <CardItem button cardBody onPress={() => Linking.openURL(this.props.video.url)}>
                    <ImageBackground source={{uri: this.props.video.url.replace(".mp4", ".jpg")}} style={{height: 200, width: null, flex: 1,}}/>
                    <Icon type="FontAwesome" name="play-circle" style={{position: "absolute", left: 150, color:"white", fontSize:50, width: 50}}/>
                </CardItem>
                :
                null
                }
                <CardItem>
                {this.props.video.url ?
                    <Right style={{right: 10}}>
                        <Button transparent onPress={() => this.props.navigation('Details', {video: this.props.video})}>
                            <Text style={{color: "blue"}}>{strings("videoCard.videoDetails")}</Text>
                            <Icon active name="md-eye"/>
                        </Button>
                    </Right>
                    :
                    <Left>
                        <Button transparent danger onPress={() => this.props.removeVideo(this.props.video)}>
                            <Text>{strings("videoCard.deleteVideo")}</Text>
                            <Icon name="trash"/>
                        </Button>
                    </Left>
                }
                    { this.props.video.url ?
                    <Left style={{flexDirection:"row"}}>
                        <Text style={{color: "green", right: 5}}>{strings("videoCard.videoInServer")}</Text>
                        <Icon name="md-cloud-done" style={{color:'green'}}/>
                    </Left>
                    :
                    <Left>
                        <Button transparent warning onPress={() => this.props.navigation('Details', {video: this.props.video})}>
                            <Text>{strings("videoCard.uploadToServer")}</Text>
                            <Icon name="md-cloud-upload"/>
                        </Button>
                    </Left>
                    }
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
  }
}