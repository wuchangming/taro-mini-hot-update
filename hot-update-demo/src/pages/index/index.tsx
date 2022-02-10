import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.less'
import { globalObjectTest } from '../test-interpreter/globalObjectTest'
import { basicUsageTest } from '../test-interpreter/basicUsageTest'
import { addObjectToGlobalObjectTest } from '../test-interpreter/addObjectToGlobalObjectTest'
import { asynchronousTest } from '../test-interpreter/AsynchronousTest'
import { FuncComponent, functionComponentTest } from '../test-interpreter/functionComponentTest'

class Index extends Component {
    state = {
        displayTitle: true,
    }
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
                <Button
                    onClick={() => {
                        this.setState({
                            displayTitle: !this.state.displayTitle,
                        })
                    }}
                >
                    toggle Title
                </Button>
                {functionComponentTest(this.state.displayTitle)}
                <FuncComponent displayTitle={this.state.displayTitle}></FuncComponent>
            </View>
        )
    }
}

export default Index
