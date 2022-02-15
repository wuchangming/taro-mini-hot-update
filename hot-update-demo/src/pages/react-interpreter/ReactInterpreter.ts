import { useEffect, useRef, useState } from 'react'
import Interpreter from '../js-interpreter/interpreter'
import { transformComponent, CompObj } from './transformComponent'
import { polyfillComponents } from './polyfillComponents'
import { SendMessageKey, FuncPrefix } from './constants'
import { createAsyncSwitcher } from './createAsyncSwitcher'
import Taro from '@tarojs/taro'

type InsideMessage =
    | {
          type: 'render'
          comps: CompObj
      }
    | {
          type: 'waiting'
      }

type OutsideMsg = {
    type: 'exeFunc'
    funcId: string
    args: any[]
}

export function ReactInterpreter<T>(props: T & { code: string }) {
    const { code, ...restProps } = props

    const [components, setComponents] = useState<CompObj>()

    const s = useRef<(msg: OutsideMsg) => void>()

    useEffect(() => {
        const compCode = props.code
            .trim()
            .replace(/^\"use strict\";/, '')
            .replace(/^\'use strict\';/, '')

        const exeCode = `
        (function () {
            ${Object.keys(polyfillComponents)
                .map(k => {
                    return `var ${k} = {
                    type: "${k}"
                };`
                })
                .join('')}
                function sendMsg (msg) {
                    return ${SendMessageKey}(JSON.stringify(msg));
                }
                var React = {
                    createElement: function(component, props) {
                        for(var k in props) {
                            if(typeof props[k] === 'function') {
                                var mapKey = "${FuncPrefix}" + id++
                                funcsMap[mapKey] = props[k]
                                props[k] = mapKey
                            }
                        }
                        return [
                            component,
                            props,
                            arguments.slice(2)
                        ]
                    }
                };
                var id = 0;
                var funcsMap = {};
                var comps = (${compCode})(${JSON.stringify(restProps)});
                sendMsg({
                    type: 'render',
                    comps: comps
                });

                if(Object.keys(funcsMap).length > 0) {
                    while (true){
                        var outsideMsg = sendMsg({
                            type: 'waiting'
                        });
                        var msg = JSON.parse(outsideMsg)
                        if(msg.type === 'exeFunc') {
                            funcsMap[msg.funcId].apply(null, msg.args)
                        }
                    }
                }
        })();`

        const compInterpreter = new Interpreter(exeCode, (interpreter: any, globalObject: any) => {
            interpreter.setProperty(
                globalObject,
                SendMessageKey,
                interpreter.createAsyncFunction(
                    async (msgString: string, callback: (outsideMsgString?: string) => void) => {
                        const msg = JSON.parse(msgString) as InsideMessage
                        if (msg.type === 'render') {
                            setComponents(msg.comps)
                            callback()
                        } else if (msg.type === 'waiting') {
                            const [switcher, turnOn] = createAsyncSwitcher<OutsideMsg>()
                            s.current = turnOn
                            const msg = await switcher
                            callback(JSON.stringify(msg))
                        }
                    }
                )
            )
            interpreter.setProperty(
                globalObject,
                'toast',
                interpreter.createNativeFunction(function(title: string) {
                    Taro.showToast({
                        icon: 'none',
                        title,
                    })
                })
            )
        })
        compInterpreter.run()
    }, [props])

    return components
        ? transformComponent(components, (funcId, args) => {
              s.current?.({
                  type: 'exeFunc',
                  funcId,
                  args: [...args],
              })
          })
        : null
}
