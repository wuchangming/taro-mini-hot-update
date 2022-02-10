import Taro from '@tarojs/taro'
import Interpreter from '../js-interpreter/interpreter'

export function asynchronousTest(ms: number) {
    function initFunc(interpreter, globalObject) {
        interpreter.setProperty(
            globalObject,
            'sleep',
            interpreter.createAsyncFunction(function xxx(time: number, callback: (res: string) => void) {
                setTimeout(() => {
                    callback('wake up')
                }, time)
            })
        )
        interpreter.setProperty(
            globalObject,
            'toast',
            interpreter.createNativeFunction(function XX(title: string) {
                Taro.showToast({
                    icon: 'none',
                    title,
                })
            })
        )
    }

    const myInterpreter = new Interpreter(
        `
    toast('${ms}ms 和 ${2 * ms}ms 后弹出 wake up')
    var x = sleep(${ms}); 
    toast(x)
    var x2 = sleep(${ms}); 
    toast(x2)
    `,
        initFunc
    )
    myInterpreter.run()
}
