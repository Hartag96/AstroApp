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
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%'
  },
  topSection: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    padding: 30,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
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
    borderColor: '#DEE0E5'
  },
  passwordInput: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderColor: '#DEE0E5'
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
  bgGray: {
    backgroundColor: '#F4F5F7',
    padding: 20,
    width: '80%'
  },
  modal:{
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
});
