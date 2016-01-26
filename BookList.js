'use strict';
var React = require('react-native');
var BookDetail = require('./BookDetail');
var Dimensions = require('Dimensions');

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
//var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var {
    StyleSheet,
    ListView,
    Image,
    Text,
    View,
    Component,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
        padding: 10
    },
    section : {
        paddingTop : 60,
        paddingBottom : 48,
        height : Dimensions.get('window').height
    },
    separator : {
        height : 1,
        backgroundColor: '#ddd'
    },
    thumbnail : {
        width:53,
        height:81,
        marginRight:10,
    },
    rightContainer:{
        flex:1
    },
    title : {
        fontSize:20,
        marginBottom:8
    },
    author :{
        color:'#656565'
    },
    listView : {
        backgroundColor: '#F5FCFF'
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            dataSource : new ListView.DataSource({
                rowHasChanged : (row1,row2) => row1 !== row2
            })
        }
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        fetch(REQUEST_URL).then((response)=>response.json()).then((responseData) =>{
            this.setState({
                dataSource : this.state.dataSource.cloneWithRows(responseData.items),
                isLoading: false
            });
        })

    }
    render(){
        if(this.state.isLoading){
            return this.renderLoadingView();
        }
        return (
            <View style={styles.section}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderBook.bind(this)}
                    style={styles.listView}
                />
            </View>
        )
    }
    renderLoadingView(){
        return (
            <View style={styles.loading}>
                <ActivityIndicatorIOS size='large'/>
                <Text>
                    Loading books...
                </Text>
            </View>
        )
    }
    showBookDetail(book) {
        this.props.navigator.push({
            title : book.volumeInfo.title,
            component : BookDetail,
            passProps : {book}
        })
    }
    renderBook(book){
        return (
            <TouchableHighlight onPress={()=>this.showBookDetail(book)} underlayColor="#dddddd">
                <View>
                    <View style={styles.container}>
                        <Image source={{uri:book.volumeInfo.imageLinks.thumbnail}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{book.volumeInfo.title}</Text>
                            <Text style={styles.author}>{book.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        )
    }
}

module.exports = BookList;
