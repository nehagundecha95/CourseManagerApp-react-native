import React from 'react'
import {View, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, Text} from 'react-native-elements'

export default class EssayQuestion extends React.Component{
    static navigationOptions = {title: 'Essay Question'};
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0
        }
        this.formUpdate = this.formUpdate.bind(this)
    }

    formUpdate(update) {
        this.setState(update)
    }
    render(){
        return(
        <ScrollView>
            <FormLabel>Title</FormLabel>
            <FormInput onChangeText={text => this.formUpdate({title: text}) }/>
            <FormValidationMessage>
                Title is required
            </FormValidationMessage>
            <FormInput onChangeText={text => this.formUpdate({description: text}) }/>
            <FormValidationMessage>
                Description is required
            </FormValidationMessage>
            <Button	backgroundColor="green"
                       color="white"
                       title="Save"/>
            <Button	backgroundColor="red"
                       color="white"
                       title="Cancel"/>

            <Text h3>Preview</Text>

            <Text h4>{this.state.title}</Text>
            <Text>{this.state.description}</Text>


        </ScrollView>

        )
    }
}