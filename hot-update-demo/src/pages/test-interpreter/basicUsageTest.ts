import Interpreter from '../js-interpreter/interpreter'

export function basicUsageTest() {
    const myInterpreter = new Interpreter('6 * 7')
    myInterpreter.run()
    console.log('basicUsageTest result: ',  myInterpreter.value)
}
