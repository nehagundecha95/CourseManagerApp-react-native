import React, {Component} from 'react'
import {View, Alert, Picker, StyleSheet,ScrollView} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
// import WidgetTypePicker from "../elements/WidgetTypePicker";

export default class Widget extends Component {
    static navigationOptions = {title: 'Widget Types'}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: ''

        }
    }
    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
    }

    render() {
        return(
            <ScrollView>
            <View style={{padding: 15,
                margin: 10}}>
                <Button backgroundColor="#89868E" style={styles.buttons}
                    onPress={() => {
                        this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                    }}
                    title="Assignment"/>))}
                <Button backgroundColor="#89868E" style={styles.buttons}
                    onPress={() => {
                         this.props.navigation.navigate("Exam", {lessonId: this.state.lessonId})
                    }}
                    title="Exam"/>))}
            </View>
            </ScrollView>)

    }}

const styles = StyleSheet.create({
    buttons:{
        margin: 5
    }
});
