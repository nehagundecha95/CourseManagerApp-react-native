import React from 'react'
import {ButtonGroup, Text, Icon} from 'react-native-elements'
import {View} from 'react-native'


const component1 = () =>
    <View style={{backgroundColor: 'yellow'}}>
        <Text h4>Multiple Choice</Text>
    </View>
const component2 = () => <Text>Fill in the blank</Text>
const component3 = () => <Text h2>Essay</Text>
const component4 = () => <Icon name='list' type='font-awesome'/>


class QuestionTypeChooser extends React.Component{
    static navigationOptions = {title: 'Create Question'};
    constructor(){
        super()
        //select some index by default
        this.state = {selectedIndex: 0}
        this.updateIndex = this.updateIndex.bind(this)

    }
    updateIndex(selectedIndex){
        this.setState({selectedIndex});
    }
    render () {
        // const buttons = ['Multiple Choice',
        //     'Fill in the blank', 'Essay', 'True or\nfalse']
        const buttons = [
            {element: component1},
            {element: component2},
            {element: component3},
            {element: component4}]

        const { selectedIndex } = this.state
        return (

            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{height: 75}}/>
        )
    }
}

export default QuestionTypeChooser