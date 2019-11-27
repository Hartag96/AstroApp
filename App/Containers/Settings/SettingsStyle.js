import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    alignItems: 'stretch',
    alignContent: 'stretch',
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: '100%'
  },
  topSection: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    paddingTop: 10
  },
  eventBox: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'center',
    marginBottom: 20
  },
  eventBoxChild: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    padding: 5,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#FFFFFF'
  },
  eventElement: {
      alignItems: 'center',
      justifyContent: 'center',
    flexGrow: 1,
    marginRight: 10
  },
  eventElementExt: {
    flexGrow: 7
  },
  eventTitle:{
    fontWeight: 'bold',
    fontSize: 18
  },
  eventCheck: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  settingsTitle: {
    fontWeight: 'bold',
    fontSize: 19,
    padding: 10
  },
  bottomSection: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  navigation:{
    width: '100%',
    
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto'
  },
  navigationButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    backgroundColor: '#333333'
  },
  mailInput: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderColor: '#F6F6F6'
  },
  passwordInput: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderColor: '#F6F6F6'
  },
  loginScreenButton:{
    backgroundColor:'#1E6738',
    borderColor: '#fff'
  },
  loginText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  eventDesc: {
    padding: 10,
  }
});
