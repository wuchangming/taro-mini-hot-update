import React, { Ref } from 'react'
import { View } from '@tarojs/components'
import { Component, ElementType } from 'react'
import { taroPageLifecycleNames } from '../utils/taroPageLifecycleNames'
import Taro from '@tarojs/taro'

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

        hasHandleTaroPageLifecycle = false
        handleTaroPageLifecycle = (ref: Ref<ElementType>) => {
            if (this.hasHandleTaroPageLifecycle) {
                return
            }
            this.hasHandleTaroPageLifecycle = true

            // 页面事件透传
            taroPageLifecycleNames.forEach(name => {
                // 如果未设置分享，则取消分享
                if (!ref?.['onShareAppMessage']) {
                    Taro.hideShareMenu()
                }
                ;(this as any)[name] = (...args: any) => {
                    return ref?.[name]?.(...args)
                }
            })
        }
        // 强行触发分享事件，用户没有再关掉
        onShareAppMessage() {
            return {}
        }

        render = () => {
            const RemotePage = this.state.RemotePage
            return RemotePage ? (
                <RemotePage
                    ref={ref => {
                        this.handleTaroPageLifecycle(ref)
                    }}
                ></RemotePage>
            ) : (
                <View>Loading...</View>
            )
        }
    }
}

export default createRemotePage(import('./RemotePage'))
