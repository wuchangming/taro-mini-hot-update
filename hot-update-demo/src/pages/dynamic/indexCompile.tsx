// import { createRemotePage } from '../utils/createRemotePage'
import { View } from '@tarojs/components'
import React, { Component, ElementType } from 'react'

function createRemotePage(p: Promise<{ default: any }>) {
    return class extends Component {
        constructor(props) {
            super(props)
            p.then(res => {
                const RemotePage = res.default
                this.setState({
                    RemotePage,
                })
            })
        }

        state: {
            RemotePage: ElementType | undefined
        } = {
            RemotePage: undefined,
        }

        render = () => {
            const RemotePage = this.state.RemotePage
            return RemotePage ? <RemotePage></RemotePage> : <View>Loading...</View>
        }
    }
}

const fakeRequest = async () => {
    await new Promise(res => {
        setTimeout(res, 300)
    })
    const remoteString = require('./RemotePage.remote').remoteString
    const { Interpreter } = require('eval5')

    const exports: any = {}

    // fake require('@tarojs/components')
    const fakeRequire = () => {
        return require('@tarojs/components')
    }

    const interpreter = new Interpreter({ React, exports, require: fakeRequire })
    interpreter.evaluate(remoteString)
    
    return exports
}

// export default createRemotePage(import('./RemotePage'))
export default createRemotePage(fakeRequest())
