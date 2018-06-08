import React from 'react'
import {Header} from 'react-native-elements'

const FixedHeader = () => (
  <Header
    outerContainerStyles={{ backgroundColor: 'black'}}
    leftComponent={{icon: 'menu', color: '#fff' }}
    centerComponent={{	text: 'Course Manager',
      style: { color: '#fff' , fontSize: 20} }}
    rightComponent={{ icon: 'home', color: '#fff' }}/>
)

export default FixedHeader