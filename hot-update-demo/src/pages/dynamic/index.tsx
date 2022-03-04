// import { createRemotePage } from '../utils/createRemotePage'
import { View } from '@tarojs/components'
import { Component, ElementType } from 'react'

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

export default createRemotePage(import('./RemotePage'))
