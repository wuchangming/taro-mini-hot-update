import React from 'react'
import { Button, View } from '@tarojs/components'
import { createRemotePage } from '../mini-hot/createRemotePage'

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
