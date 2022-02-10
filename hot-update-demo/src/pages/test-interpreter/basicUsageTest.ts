import Taro from '@tarojs/taro'
import Interpreter from '../js-interpreter/interpreter'

export function basicUsageTest() {
    const code = '6 * 7'
    const myInterpreter = new Interpreter(code)
    myInterpreter.run()

    Taro.showToast({
        icon: 'none',
        title: `${code} = ${myInterpreter.value}`,
    })
}
