import React from 'react'
import {View, TextInput, StyleSheet, ScrollView, Alert} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

export default class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Create new Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: '',
            title: '',
            description: '',
            points: '',
            widgets: [],
            assignmentId: ''
        }
        if(this.props.navigation.getParam("assignmentId")!==undefined){
            const assignmentId = this.props.navigation.getParam("assignmentId");
            fetch("http://10.0.0.138:8080/api/assignment/" + assignmentId)
                .then(response => (response.json()))
                .then(assignment => {this.setState({title:assignment.title})
                this.setState({description: assignment.description})
                this.setState({points: assignment.points})})
        }
        this.AssignmentService = AssignmentService.instance;
        // this.setAssignment = this.setAssignment.bind(this);
    }
    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId",1 )
        this.setState({
            lessonId: lessonId
        })
    }

    updateForm(newState) {
        console.log(newState)
        this.setState(newState)

    }

    createNewAssignment(){
        this.AssignmentService.createAssignment(this.state.title,this.state.description,this.state.points, this.state.lessonId);
    }

    render() {
        return(
            <ScrollView>
                <View>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                           onPress={()=>{this.createNewAssignment();
                               this.props.navigation.navigate("Assignment",{lessonId:this.state.lessonId})}}
                />
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

            <View style={{padding: 15}}>
                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text style={{textAlign: 'right'}} h3>{this.state.points} pts</Text>
                <Text>{this.state.description}</Text>
                <Text h3>Essay answer</Text>
                <TextInput style={{borderWidth: 1, height: 100, backgroundColor: 'white'}}

                    editable = {true}
                    maxLength = {40}
                />
                <Text h3>Upload a file</Text>
                <TextInput style={{borderWidth: 1, height: 50, backgroundColor: 'white'}}

                           editable = {true}
                           maxLength = {40}
                />
                <Text h3>Submit a link</Text>
                <TextInput style={{borderWidth: 1, height: 50, backgroundColor: 'white'}}

                           editable = {true}
                           maxLength = {40}
                />
            </View>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

