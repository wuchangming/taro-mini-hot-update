import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.less'
import { globalObjectTest } from '../test-interpreter/globalObjectTest'
import { basicUsageTest } from '../test-interpreter/basicUsageTest'
import { addObjectToGlobalObjectTest } from '../test-interpreter/addObjectToGlobalObjectTest'
import { asynchronousTest } from '../test-interpreter/AsynchronousTest'

class Index extends Component {
    render() {
        return (
            <View className='index'>
                <Button onClick={basicUsageTest}>basicUsageTest</Button>
                <Button
                    onClick={() => {
                        globalObjectTest('Hello taro-mini-hot-update!')
                    }}
                >
                    globalObjectTest
                </Button>
                <Button
                    onClick={() => {
                        addObjectToGlobalObjectTest()
                    }}
                >
                    addObjectToGlobalObjectTest
                </Button>
                <Button
                    onClick={() => {
                        asynchronousTest(3000)
                    }}
                >
                    asynchronousTest
                </Button>
            </View>
        )
    }
}

export default Index
