import * as taroComps from '@tarojs/components'

const CustomComp = () => {
    return (
        <taroComps.View>
            <taroComps.Text>自定义组件</taroComps.Text>
        </taroComps.View>
    )
}

export const polyfillComponents = {
    ...taroComps,
    CustomComp: CustomComp,
} as const
