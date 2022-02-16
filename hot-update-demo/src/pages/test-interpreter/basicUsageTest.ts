import Taro from '@tarojs/taro'
import { JSInterpreter } from 'react-interpreter'

export function basicUsageTest() {
    const code = '6 * 7'
    const myInterpreter = new JSInterpreter(code)
    myInterpreter.run()

    Taro.showToast({
        icon: 'none',
        title: `${code} = ${myInterpreter.value}`,
    })
}
