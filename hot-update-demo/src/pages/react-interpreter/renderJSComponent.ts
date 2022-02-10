import Interpreter from '../js-interpreter/interpreter'
import { arrayToRealComponent } from './arrayToRealComponent'
import { reactPolyfill } from './reactPolyfill'

export function renderJSComponent<T>(code: string, props?: T) {
    const polyfill = reactPolyfill
    const exeCode = `
            (function () {
                ${polyfill};
                var res = (${code})(${JSON.stringify(props)});
                return JSON.stringify(res)
            })();
        `

    const interpreter = new Interpreter(exeCode)
    
    interpreter.run()

    const components = JSON.parse(interpreter.value)
    return arrayToRealComponent(components)
}
