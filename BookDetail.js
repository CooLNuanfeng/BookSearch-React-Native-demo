'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var {
    StyleSheet,
    Text,
    View,
    Component,
    Image
} = React;

var styles = StyleSheet.create({
    section : {
        height : Dimensions.get('window').height,
    },
    container : {
        marginTop : 75,
        alignItems : 'center'
    },
    image : {
        width : 107,
        height: 165,
        padding: 10
    },
    description : {
        padding : 10,
        fontSize : 15,
        color : '#656565',
    }
});

class BookDetail extends Component {
    render() {
        var book = this.props.book;
        var imageURI = (typeof book.volumeInfo.imageLinks !=='undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
        var description = (typeof book.volumeInfo.description !=='undefined') ? book.volumeInfo.description : '';
        //<Text style={styles.description} numberOfLines={5}>{description}</Text>
        return (
            <View style={styles.section}>
                <View style={styles.container}>
                    <Image source={{uri:imageURI}} style={styles.image}/>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        )
    }
}

module.exports = BookDetail;
