import React from 'react'
import {View, TextInput, StyleSheet, ScrollView, Alert} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

var assignmentId = 0
export default class AssignmentWidget extends React.Component {
    static navigationOptions = { title: "Assignment Widget"}
    constructor(props) {
        super(props)
        this.state = {
            lessonId: '',
            title: 'Assignment',
            description: '',
            points: 0,
            widgets: [],
            assignmentId: '',
            hiddenUpdateBtn: false,
            hiddenSaveBtn: true
        }

        if(this.props.navigation.getParam("assignmentId")!==undefined){
            assignmentId = this.props.navigation.getParam("assignmentId");
            fetch("http://localhost:8080/api/assignment/" + assignmentId)
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
    }
    componentDidMount() {
        // const {navigation} = this.props;
        const lessonId = this.props.navigation.getParam("lessonId", 1)
        this.setState({
            lessonId: lessonId
        })
        this.setState({assignmentId: assignmentId})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createNewAssignment(){
        this.AssignmentService
            .createAssignment(
                this.state.title,
                this.state.description,
                this.state.points,
                this.state.lessonId)
            .then(response =>{
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            });
    }

    updateAssignment(){
        this.AssignmentService
            .updateAssignment(
                this.state.title,
                this.state.description,
                this.state.points,
                this.state.assignmentId)
            .then(response =>{
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
            });
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
                                    Alert.alert('Created new assignment');
                                    this.createNewAssignment();
                                    this.props.navigation.navigate("Assignment", {lessonId: this.state.lessonId})
                                }}

                        />
                        }

                        {this.state.hiddenUpdateBtn &&
                            <Button style={styles.buttons} backgroundColor="#148C0A"
                                    color="white"
                                    title="Edit"
                                    onPress={() => {
                                        Alert.alert('Updated assignment');
                                        this.updateAssignment();
                                        this.props.navigation
                                            .navigate("Assignment", {lessonId: this.state.lessonId})
                                    }}/>
                        }
                    {this.state.hiddenUpdateBtn &&
                    <Button style={styles.buttons} backgroundColor="#CD2704"
                            color="white"
                            title="Delete"
                            onPress={() => {
                                Alert.alert(
                                    'Delete',
                                    'Are you sure you want to delete this question?',
                                    [
                                        {text: 'Yes', onPress: () => {this.deleteAssignment();
                                                                    this.props.navigation
                                                                        .navigate("Assignment", {lessonId: this.state.lessonId})}},
                                        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                )


                            }}/>
                    }

                    <Button	 style={styles.buttons} backgroundColor="#89868E"
                               color="white"
                               title="Cancel"
                               onPress={()=>{this.props.navigation
                                   .navigate("Assignment",{lessonId:this.state.lessonId})}}/>

                    <Text style={styles.previewHeader} h4>Preview</Text>
                    <View style={styles.previewSection}>
                        <View flexWrap={'wrap'} style={styles.previewSectionHeader}>
                            <Text style={{margin: 10, color: '#EBE8E7',fontSize: 25}} h4>{this.state.title}</Text>
                            <Text style={{textAlign: 'right',margin: 10, color: '#EBE8E7',fontSize: 25}} h4>{this.state.points} pts</Text>
                        </View>
                        <View style={styles.previewSectioninside}>
                            <Text style={{fontSize: 20,marginBottom: 20,}}>{this.state.description}</Text>
                            <Text style={{fontSize: 15}}>Essay answer</Text>
                            <TextInput style={styles.textInputEssayAns}
                                editable = {true}
                                maxLength = {40}/>
                            <Text style={{fontSize: 15}}>Upload a file</Text>
                            <View style={{flex:1, flexDirection: 'row'}}>

                                <TextInput style={styles.textInput2}
                                           editable = {true}
                                           maxLength = {40}/>
                                <Button style={{justifyContent: 'flex-end', marginTop: 7}} backgroundColor="#89868E" title="Choose file"/>
                            </View>
                            <Text style={{fontSize: 15}} >Submit a link</Text>
                            <TextInput style={styles.textInput}
                                       editable = {true}
                                       maxLength = {40}/>
                            <View style={{flex:1, flexDirection:'row', margin: 10}}>
                                <Button backgroundColor="#89868E" title="Cancel"/>
                                <Button backgroundColor="#89868E" title="Submit"/>
                            </View>
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
        borderTopStartRadius:5,

    },
    previewSectioninside:{
        padding: 15,
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
        borderRadius: 5,
        marginBottom: 15
    },
    textInput: {
        margin: 5,
        borderWidth: 1,
        height: 50,
        borderColor: '#A19E9D',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 15
    },
    textInput2: {
        margin: 5,
        borderWidth: 1,
        height: 50,
        borderColor: '#A19E9D',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 15,
        width: 218
    },
    buttons:{
        margin: 5
    },
    container: {
        backgroundColor: '#fff',
    },
});

