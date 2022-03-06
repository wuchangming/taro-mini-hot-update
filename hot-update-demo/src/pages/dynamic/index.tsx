import React from 'react'
import { Button, View } from '@tarojs/components'
// import { Component, ElementType } from 'react'
// import { taroPageLifecycleNames } from '../utils/taroPageLifecycleNames'
// import Taro from '@tarojs/taro'

// function createRemotePage(p: Promise<{ default: any }>) {
//     return class extends Component {
//         constructor(props) {
//             super(props)
//             p.then(res => {
//                 const RemotePage = res.default
//                 this.setState({
//                     RemotePage,
//                 })
//             })
//         }

//         state: {
//             RemotePage: ElementType | undefined
//         } = {
//             RemotePage: undefined,
//         }

//         hasHandleTaroPageLifecycle = false
//         handleTaroPageLifecycle = (ref: Ref<ElementType>) => {
//             if (this.hasHandleTaroPageLifecycle) {
//                 return
//             }
//             this.hasHandleTaroPageLifecycle = true

//             // 页面事件透传
//             taroPageLifecycleNames.forEach(name => {
//                 // 如果未设置分享，则取消分享
//                 if (!ref?.['onShareAppMessage']) {
//                     Taro.hideShareMenu()
//                 }
//                 ;(this as any)[name] = (...args: any) => {
//                     return ref?.[name]?.(...args)
//                 }
//             })
//         }
//         // 强行触发分享事件，用户没有再关掉
//         onShareAppMessage() {
//             return {}
//         }

//         render = () => {
//             const RemotePage = this.state.RemotePage
//             return RemotePage ? (
//                 <RemotePage
//                     ref={ref => {
//                         this.handleTaroPageLifecycle(ref)
//                     }}
//                 ></RemotePage>
//             ) : (
//                 <View>Loading...</View>
//             )
//         }
//     }
// }

import { createRemotePage } from '../mini-hot/createRemotePage'
// import RemotePage from './RemotePage'

export default createRemotePage({
    getPage: async () => {
        await new Promise(r => {
            setTimeout(r, 2000)
        })
        if (Math.random() > 0.5) {
            // 随机出错
            throw 'error'
        }
        const RemotePage = (await import('./RemotePage')).default
        return RemotePage
    },
    onLoading: () => {
        return () => <View>Loading...</View>
    },
    onError: reload => {
        return () => (
            <View>
                Error !! <Button onClick={reload}>点击重试</Button>
            </View>
        )
    },
    preFetch: false,
})
