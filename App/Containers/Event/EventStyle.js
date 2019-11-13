import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal:{
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    textMargin: {
        marginVertical: 5
    },
    frontButton: {
        width: 100
    },
    mailInput: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '60%',
        borderColor: '#222222',
    },
    passwordInput: {
        borderWidth: 1,
        marginVertical: 13,
        padding: 10,
        width: '60%',
        borderColor: '#222222',
    },
    logout: {
        marginRight:50
    }
});