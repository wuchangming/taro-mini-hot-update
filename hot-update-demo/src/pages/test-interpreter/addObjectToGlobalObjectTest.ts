import Taro from '@tarojs/taro'
import { JSInterpreter } from 'react-interpreter'

export function addObjectToGlobalObjectTest() {
    const myCode = 'Taro.showToast(Taro.version);'
    const initFunc = function(interpreter, globalObject) {
        // Create 'Taro' global object.
        const PseudoTaro = interpreter.nativeToPseudo({})
        interpreter.setProperty(globalObject, 'Taro', PseudoTaro)

        // Define 'Taro.version' property.
        interpreter.setProperty(PseudoTaro, 'version', '3.4.1')

        // Define 'Taro.showToast' function.
        interpreter.setProperty(
            PseudoTaro,
            'showToast',
            interpreter.createNativeFunction((title: string) => {
                Taro.showToast({ title, icon: 'none' })
            })
        )
    }
    const myInterpreter = new JSInterpreter(myCode, initFunc)
    myInterpreter.run()
}
