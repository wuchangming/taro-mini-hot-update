import { View, Text } from '@tarojs/components'
import { renderJSComponent } from '../react-interpreter/renderJSComponent'

/**
JSX: 内容
*/

export function FuncComponent(props: { displayTitle: boolean }) {
    return (
        <View style={{ backgroundColor: 'red' }}>
            {props.displayTitle === true ? <Text>This is Title</Text> : null}
            <Text> --- 通过常规代码生成</Text>
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

export function functionComponentTest(displayTitle: boolean) {
    const componentElement = renderJSComponent(code, {
        displayTitle,
    })
    return componentElement
}
