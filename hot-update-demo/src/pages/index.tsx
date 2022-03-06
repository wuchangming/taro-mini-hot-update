import React from 'react'
import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default () => {
    return (
        <View>
            <Button
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/dynamic/index',
                    })
                }}
            >
                跳转到 dynamic/index
            </Button>
            <Button
                onClick={() => {
                    Taro.navigateTo({
                        url: '/pages/dynamic/indexCompile',
                    })
                }}
            >
                跳转到 dynamic/indexCompile
            </Button>
        </View>
    )
}
