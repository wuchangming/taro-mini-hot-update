import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import './index.less'
import { globalObjectTest } from '../test-interpreter/globalObjectTest'
import { basicUsageTest } from '../test-interpreter/basicUsageTest'
import { addObjectToGlobalObjectTest } from '../test-interpreter/addObjectToGlobalObjectTest'
import { asynchronousTest } from '../test-interpreter/AsynchronousTest'
import { ReactInterpreter } from 'react-interpreter'
import { basicCode } from '../test-interpreter/basicCode'
import Taro from '@tarojs/taro'
import * as taroComps from '@tarojs/components'

class Index extends Component {
    state = {
        displayTitle: true,
        remoteCode: null,
    }

    componentDidMount = () => {
        Taro.request({
            url:
                'https://cdn.jsdelivr.net/gh/wuchangming/taro-mini-hot-update/hot-update-demo/src/pages/test-interpreter/remoteCode.js',
        }).then(res => {
            console.log(res)
            this.setState({
                remoteCode: res.data,
            })
        })
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
                <ReactInterpreter
                    globalObject={{
                        Taro,
                        console,
                        // @ts-ignore
                        wx,
                    }}
                    componentMap={taroComps}
                    code={basicCode}
                    displayTitle={this.state.displayTitle}
                ></ReactInterpreter>
                <ReactInterpreter
                    globalObject={{
                        Taro,
                        console,
                        // @ts-ignore
                        wx,
                    }}
                    componentMap={taroComps}
                    code={this.state.remoteCode || ''}
                    displayTitle={!this.state.displayTitle}
                ></ReactInterpreter>
            </View>
        )
    }
}

export default Index
