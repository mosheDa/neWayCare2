import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView } from 'react-native';
import axios from 'axios';
import {cloud_name, api_key, api_secret} from '../cloudinaryDetails.js'
import base64 from 'react-native-base64'
import VideoCard from "./VideoCard"
import AddVideo from "./AddVideo"
import { Container, Header, Button, Icon, Right, Left, Spinner, Body, Content, Text} from 'native-base';
import { strings } from '../locales/i18n';
import Modal from "react-native-modal";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
// import Video from 'react-native-video';
// import Video from 'react-native-video-player';
import VideoPlayer from 'react-native-video-controls';
// import CircleButton from 'react-native-circle-button';
import ActionButton from 'react-native-action-button';



export default class Videos extends React.Component {

  state = { videos: [] , isLoaded: false, results: false, userData:"a", isModalVisible: false, navigation:this.props.navigation};

  componentDidMount() {
    AsyncStorage.getItem('userData', (err, userData) => {
      if(userData){
        this.setState({userData: JSON.parse(userData).name})
        const { navigation } = this.props;
        let bla = navigation.getParam('video', 'NO-ID')
        if(bla != 'NO-ID') {
          this.getVideos();
          this.setState(prevState => ({
            videos: [...prevState.videos,bla]
          }));
        } else {
          this.getVideos();
        }
      }
    });
  }

  openModal(){
    videoDetails = {"name":"VID_20181129_201200.mp4","path":"/storage/emulated/0/DCIM/Camera/VID_20181129_201200.mp4","uri":"content://com.google.android.apps.photos.contentprovider/-1/2/content%3A%2F%2Fmedia%2Fexternal%2Fvideo%2Fmedia%2F52/ORIGINAL/NONE/1161781384"}
    this.setState({videoDetails, isModalVisible: true});
  }

  closeModal(){
    this.setState({ isModalVisible: false });
  }

  getVideos() {
    const tok = api_key+":"+api_secret;
    const hash = base64.encode(tok);
    const Basic = 'Basic ' + hash;
    const url = 'https://api.cloudinary.com/v1_1/dtvoiy5lg/resources/video/context/?key=username&value=' + this.state.userData
    console.log(url)
    axios.get(url, {headers : { 'Authorization' : Basic }})
          .then(res => {
              this.setState({ videos: res.data.resources, isLoading: true});
          })
          .catch(err =>{
            console.log(err.response)
          });
  }

  removeVideo(videoItem) {
    let {videos} = this.state
    videos.splice(videos.indexOf(videoItem), 1)
    videos.forEach(function(part, index, theArray) {
      theArray[index].url ? null : theArray[index].name = "Video " + (theArray.length - index);
    });
    this.setState({videos: videos})
  }

  addVideo(item) {
    // videoName = "Video " + (this.state.videos.length == 0 ? 1 : this.state.videos.length + 1)
    videoName = item.path.substring(item.path.lastIndexOf('/')+1)
    
    videoDetails = {name: videoName, path: item.path, uri: item.uri}
    //  this.props.navigation.navigate('Details', {video: videoDetails})
    this.setState({videoDetails, isModalVisible: true});
    // this.setState(prevState => ({
    //   videos: [videoDetails,...prevState.videos]
    // }));
  }

  render() {
    let {videos, videoDetails, isModalVisible, navigation} = this.state

    return (
      <Container>
        <Header>
        {/* <Button onPress={this.openModal.bind(this)}>
            <Text>open me!</Text>
          </Button>         */}
          <Body style={{alignItems: "center"}}>
            <Text style={{color: "white", fontSize:20}}>{strings('labels.videos')}</Text>
          </Body>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, right: 15}}/>
        </Header>
        {this.state.isLoading ?
        <Content>
         
          <Text style={{justifyContent:"center", alignSelf:"center"}}>{strings('videos.uploadTitle')}</Text>
          {videoDetails &&
          <Modal backdropColor="white" isVisible={isModalVisible}>
          <VideoPlayer
            source={{ uri: videoDetails.uri }}
            onBack={this.closeModal.bind(this)}
        />

         <ActionButton    buttonColor={"orange"}>
         <ActionButton.Item buttonColor='green' title={strings('videos.add')} onPress={()=>{navigation.navigate('Details', {video: videoDetails})}}>
            <Icon name="md-cloud-upload"/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='red' title={strings('videos.remove')} onPress={this.closeModal.bind(this)}>
            <Icon name="md-remove-circle"  />
          </ActionButton.Item>
          
          </ActionButton>
        
          
            {/* <CircleButton size={45} 
            primaryColor={}
            onPressButtonLeft={this.closeModal.bind(this)} 
            onPressButtonRight={()=>{navigation.navigate('Details', {video: videoDetails})}}
             iconButtonTop={ {}}
             iconButtonRight={ require("../assets/images/upload.png")}
             iconButtonLeft={ require("../assets/images/close.png")}

             iconButtonBottom={ {}}/> */}
         
      
        </Modal>}
          <ScrollView>
           {
                videos.map((video, index) => <VideoCard navigation={(item, bla) => this.props.navigation.navigate(item, bla)} video={video} key={index} removeVideo={(item) => this.removeVideo(item)}/>)
            }
          </ScrollView>
        </Content>
        :
        <Body style={{alignContent:"center", justifyContent:"center"}}>
            <Spinner color='blue'/>
            <Text>{strings('videos.loadingMsg')}</Text>
          </Body>}

           { videos.length < 4 && this.state.isLoading &&  <AddVideo addVideo={(item) => this.addVideo(item)}/>} 
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  submit:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
