import Interpreter from '../js-interpreter/interpreter'
import { arrayToRealComponent } from './arrayToRealComponent'
import { reactPolyfill } from './reactPolyfill'

export const ReactInterpreter = {
    renderComponent: (code: string, props?: string) => {
        const polyfill = reactPolyfill
        const exeCode = `
            (function () {
                ${polyfill};
                var res = (${code})(${props});
                return JSON.stringify(res, null, 2)
            })();
        `

        const interpreter = new Interpreter(exeCode)
        interpreter.run()
        const components = JSON.parse(interpreter.value)
        return arrayToRealComponent(components)
    },
}