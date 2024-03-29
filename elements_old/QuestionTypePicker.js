import React,{Component} from 'react'
import {Picker} from 'react-native'

export default class QuestionTypePicker extends Component{
    constructor(props){
        super(props);
        this.state = {questionType: 'MC'}
    }
    render(){

        return(
            <Picker selectedValue = {this.state.questionType}
            onValueChange={(itemValue, itemIndex) =>

            this.setState({questionType:itemValue})}>
                <Picker.Item value="MC" label="Multiple choice" />
                <Picker.Item value="ES" label="Essay" />
                <Picker.Item value="TF" label="True or false" />
                <Picker.Item value="FB" label="Fill in the blanks" />
            </Picker>
        )
    }
}