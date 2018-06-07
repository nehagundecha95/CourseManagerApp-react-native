import React from 'react'
import {View, TextInput, StyleSheet, ScrollView, Alert} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

var assignmentId = 0
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
            assignmentId: '',
            hiddenUpdateBtn: false,
            hiddenSaveBtn: true
        }

        if(this.props.navigation.getParam("assignmentId")!==undefined){
            assignmentId = this.props.navigation.getParam("assignmentId");
            fetch("http://10.0.0.138:8080/api/assignment/" + assignmentId)
                .then(response => (response.json()))
                .then(assignment => {
                    this.setState({hiddenUpdateBtn: true})
                    this.setState({title: assignment.title})
                    this.setState({description: assignment.description})
                    this.setState({points: assignment.points})
                    this.setState({hiddenSaveBtn: false})
                    })
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
        this.setState({assignmentId: assignmentId})
    }

    updateForm(newState) {
        // console.log(newState)
        this.setState(newState)
    }

    createNewAssignment(){
        this.AssignmentService.createAssignment(this.state.title,this.state.description,this.state.points, this.state.lessonId);
    }

    updateAssignment(){
        // console.log("in update assignment client")
        this.AssignmentService.updateAssignment(this.state.title,this.state.description,this.state.points, this.state.assignmentId);
    }
    deleteAssignment(){
        this.AssignmentService.deleteAssignment(this.state.assignmentId);
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

                        {this.state.hiddenSaveBtn &&
                        <Button style={styles.buttons} backgroundColor="#148C0A"
                                color="white"
                                title="Save"
                                onPress={() => {
                                    this.createNewAssignment();
                                    this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                                }}

                        />
                        }

                        {this.state.hiddenUpdateBtn &&
                            <Button style={styles.buttons} backgroundColor="#1869AD"
                                    color="white"
                                    title="Edit"
                                    onPress={() => {
                                        this.updateAssignment();
                                        this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                                    }}/>
                        }
                    {this.state.hiddenUpdateBtn &&
                    <Button style={styles.buttons} backgroundColor="#CD2704"
                            color="white"
                            title="Delete"
                            onPress={() => {
                                this.deleteAssignment();
                                this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                            }}/>
                    }

                    <Button	 style={styles.buttons} backgroundColor="#89868E"
                               color="white"
                               title="Cancel"
                               onPress={()=>{this.props.navigation.navigate("Assignment",{lessonId:this.state.lessonId})}}/>

                    <Text style={styles.previewHeader} h4>Preview</Text>
                    <View style={styles.previewSection}>
                        <View style={styles.previewSectionHeader}>
                            <Text style={{margin: 10, color: '#EBE8E7'}} h4>{this.state.title}</Text>
                            <Text style={{textAlign: 'right',margin: 10, color: '#EBE8E7'}} h4>{this.state.points} pts</Text>
                        </View>
                        <View style={styles.previewSectioninside}>
                            <Text>{this.state.description}</Text>
                            <Text h4>Essay answer</Text>
                            <TextInput style={styles.textInputEssayAns}
                                editable = {true}
                                maxLength = {40}/>
                            <Text h4>Upload a file</Text>
                            <TextInput style={styles.textInput}
                                       editable = {true}
                                       maxLength = {40}/>
                            <Text h4>Submit a link</Text>
                            <TextInput style={styles.textInput}
                                       editable = {true}
                                       maxLength = {40}/>
                        </View>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    previewSection:{
        borderWidth: 1,
        borderColor: '#A19E9D',
        margin: 5,
        backgroundColor: '#D3D1D0',
        borderRadius: 5

    },
    previewSectionHeader:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
        borderTopEndRadius: 5,
        borderTopStartRadius:5
    },
    previewSectioninside:{
        padding: 15,
        // borderWidth: 1,
        margin: 5,
        backgroundColor: '#D3D1D0'

    },
    previewHeader: {
        marginTop: 20,
        margin: 5
    },
    textInputEssayAns: {
      margin: 5,
        borderWidth: 1,
        borderColor: '#A19E9D',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5
    },
    textInput: {
        margin: 5,
        borderWidth: 1,
        height: 50,
        borderColor: '#A19E9D',
        backgroundColor: 'white',
        borderRadius: 5
    },
    buttons:{
        margin: 5
    },
    container: {
    // flex: 1,
        backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

