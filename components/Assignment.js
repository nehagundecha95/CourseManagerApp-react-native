import React from 'react'
import {View, Alert, StyleSheet,ScrollView} from 'react-native'
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
        this.refresh = this.refresh.bind(this);
    }
    refresh(){
        const {navigation} = this.props;
        console.log("in refresh")
        fetch("http://localhost:8080/api/lesson/" + this.state.lessonId + "/assignment")
            .then(response => (response.json()))
            .then(widgets => {
                console.log("here:", widgets);
                this.setState({widgets: widgets})
            })
    }

    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
        fetch("http://localhost:8080/api/lesson/" + lessonId + "/assignment")
            .then(response => (response.json()))
            .then(widgets => {
                console.log("here:", widgets);
                this.setState({widgets: widgets})
            })
    }
    componentWillReceiveProps(){
        fetch("http://localhost:8080/api/lesson/" + this.state.lessonId + "/assignment")
            .then(response => (response.json()))
            .then(widgets => {
                console.log("here:", widgets);
                this.setState({widgets: widgets})
            })
    }

    render() {
        return (
            <ScrollView>
            <View style={{padding: 15}}>

                {/*list of all widgets*/}
                {this.state.widgets.map((widget, index) => (

                    <ListItem
                        onPress={() => {
                           this.props.navigation.navigate("AssignmentWidget", {assignmentId: widget.id,refresh:this.refresh})
                        }}
                        key={index}
                        subtitle={widget.description}
                        title={widget.title}/>))}

                {/*<Text h4>Create new widget</Text>*/}

                <Button backgroundColor="#89868E"
                    onPress={() => {
                        this.props.navigation.navigate("AssignmentWidget", {lessonId: this.state.lessonId,refresh:this.refresh})
                    }}
                    title="Create new Assignment"
                style={styles.buttons}/>

            </View>
            </ScrollView>)
    }
}

const styles = StyleSheet.create({
    buttons:{
        margin: 5
    }
});


