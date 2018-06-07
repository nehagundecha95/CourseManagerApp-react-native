import React from 'react'
import {View, Alert, StyleSheet} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'

export default class Assignment extends React.Component {
    static navigationOptions = {title: 'Assignment'}

    // static navigationOptions = {title: 'Courses'}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: '',
            widgets: []
        }
    }

    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
        fetch("http://10.0.0.138:8080/api/lesson/" + lessonId + "/assignment")
            .then(response => (response.json()))
            .then(widgets => {
                console.log("here:", widgets);
                this.setState({widgets: widgets})
            })
    }
    componentWillReceiveProps(){
        fetch("http://10.0.0.138:8080/api/lesson/" + this.state.lessonId + "/assignment")
            .then(response => (response.json()))
            .then(widgets => {
                console.log("here:", widgets);
                this.setState({widgets: widgets})
            })
    }

    render() {
        return (

            <View style={{padding: 15}}>

                {/*list of all widgets*/}
                {this.state.widgets.map((widget, index) => (

                    <ListItem
                        onPress={() => {
                           this.props.navigation.navigate("AssignmentWidget", {assignmentId: widget.id})

                        }}
                        key={index}
                        subtitle={widget.description}
                        title={widget.title}/>))}

                {/*<Text h4>Create new widget</Text>*/}

                <Button
                    onPress={() => {
                        this.props.navigation.navigate("AssignmentWidget", {lessonId: this.state.lessonId})
                    }}
                    title="Create new Assignment"
                style={styles.buttons}/>

            </View>)
    }
}

const styles = StyleSheet.create({
    buttons:{
        margin: 5
    }
});


