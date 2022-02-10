import Taro from '@tarojs/taro'
import Interpreter from '../js-interpreter/interpreter'

export function addObjectToGlobalObjectTest() {
    var myCode = 'Taro.showToast(Taro.version);'
    var initFunc = function(interpreter, globalObject) {
        // Create 'Taro' global object.
        var PseudoTaro = interpreter.nativeToPseudo({})
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
    var myInterpreter = new Interpreter(myCode, initFunc)
    myInterpreter.run()
}