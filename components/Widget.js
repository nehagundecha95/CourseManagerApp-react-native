import React, {Component} from 'react'
import {View, Alert, Picker} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
// import WidgetTypePicker from "../elements/WidgetTypePicker";

export default class Widget extends Component {
    static navigationOptions = {title: 'Widget Type'}
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
            <View style={{padding: 15}}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                    }}
                    title="Assignment"/>))}
                <Button
                    onPress={() => {
                         this.props.navigation.navigate("Exam", {lessonId: this.state.lessonId})
                    }}
                    title="Exam"/>))}
            </View>)

    }}
