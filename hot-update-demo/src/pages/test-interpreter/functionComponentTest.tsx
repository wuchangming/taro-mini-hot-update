import { View, Text } from '@tarojs/components'
import { ReactInterpreter } from '../react-interpreter/ReactInterPreter'

/**

JSX: 内容
*/

export function FuncComponent(props: { displayTitle: boolean }) {
    return (
        <View style={{ backgroundColor: 'red' }}>
            {props.displayTitle === true ? <Text>This is Title</Text> : null}
            <Text> --- 通过常规代码动态生成</Text>
        </View>
    )
}

/*
下面为 Babel 转换后
 */

const code = `
function FuncComponent(props) {
  return /*#__PURE__*/ React.createElement(
    View,
    {
      style: {
        backgroundColor: "yellow",
      }
    },
    props.displayTitle === true
      ? /*#__PURE__*/ React.createElement(Text, null, "This is Title")
      : null,
    /*#__PURE__*/ React.createElement(Text, null, " --- 通过字符串代码动态生成")
  );
}
`
const propsString = `
{
    displayTitle: true
}
`

export function functionComponentTest() {
    const componentElement = ReactInterpreter.renderComponent(code, propsString)
    return componentElement
}
