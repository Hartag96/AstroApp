import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    addCommentButton: {
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    
  modal:{
    backgroundColor: '#FFFFFF',
    padding: 20
  },
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
      contentSection:{
        flexGrow: 1,
        flexShrink: 1,
        
        flexBasis: 0
      },
      eventBox: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: 'row',
      },
      eventDesc: {
        flexBasis: 0,
        flexGrow: 1,
        flexShrink: 1
      },
      timeBox: {
        padding: 10,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFFFFF'
      },
      commentsBox: {
        padding: 10,
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
      },
      commentBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#F4F5F7',
        padding: 5,
        marginBottom: 5,
        opacity: 0.9
      },
      commentAvatar: {
          marginRight: 10
      },

      commentContent:{
          flexBasis: 0,
          flexGrow: 1,
          flexShrink: 1
      },
        eventElement: {
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            marginRight: 10
        },
        eventElementExt: {
            flexGrow: 7,
            flexBasis: 0,
            flexShrink: 1
        },
        eventTitle:{
            fontWeight: 'bold',
            fontSize: 18
        },
        remainingBold: {
            textAlign: 'center',
            fontWeight: '400'
        },
        difference: {
            fontSize: 17,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        textarea: {
            borderWidth: 1,
            borderColor: '#333333'
        },
        modalButtons: {
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            margin: 5
        },
        modalButton: {
            margin: 5
        }
});