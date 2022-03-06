import React, { Component } from 'react'
import { View } from '@tarojs/components'

export default class extends Component {
    componentDidShow () {
        console.log('componentDidShow');        
    }
    render() {
        return <View>this is RemotePage</View>
    }
}
