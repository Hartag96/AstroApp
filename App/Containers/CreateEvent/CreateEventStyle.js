import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal:{
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold'
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
      topSection: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        padding: 30,
      },
        modalButtons: {
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            margin: 5
        },
        mailInput: {
          borderWidth: 1,
          marginVertical: 5,
          padding: 10,
          alignItems: 'flex-start'
        },
        modalButton: {
            margin: 5
        }
});