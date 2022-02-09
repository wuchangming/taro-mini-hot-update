import Taro from '@tarojs/taro'
import Interpreter from '../js-interpreter/interpreter'

export function globalObjectTest(displayString: string) {
    const myCode = 'toast(path);'
    const initFunc = function(interpreter, globalObject) {
        interpreter.setProperty(globalObject, 'path', displayString)

        const wrapper = function alert(title) {
            return Taro.showToast({
                title,
                icon: 'none',
            })
        }
        interpreter.setProperty(globalObject, 'toast', interpreter.createNativeFunction(wrapper))
    }
    const myInterpreter = new Interpreter(myCode, initFunc)
    myInterpreter.run()
}
