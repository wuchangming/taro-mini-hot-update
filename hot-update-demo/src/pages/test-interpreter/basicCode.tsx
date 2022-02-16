/**
JSX: 内容
*/
/*
function FuncComponent(props: { displayTitle: boolean }) {
  return (
      <View style={{ backgroundColor: 'red' }}>
          {props.displayTitle === true ? <Text>This is Title</Text> : null}
          <Text> --- 通过字符串代码生成</Text>
      <Button onClick={() => {
          Taro.showToast({
            icon: 'none',
              title: '我被点击了'
          })
        }}>按钮</Button>
      </View>
  )
}
*/

/*
下面为 Babel 转换后
 */

export const basicCode = `
"use strict";

function FuncComponent(props) {
  return /*#__PURE__*/ React.createElement(
    View,
    {
      style: {
        backgroundColor: "red"
      }
    },
    props.displayTitle === true
      ? /*#__PURE__*/ React.createElement(Text, null, "This is Title")
      : null,
    /*#__PURE__*/ React.createElement(
      Text,
      null,
      " --- \u901A\u8FC7\u5B57\u7B26\u4E32\u4EE3\u7801\u751F\u6210"
    ),
    /*#__PURE__*/ React.createElement(
      Button,
      {
        onClick: function onClick() {
          Taro.showToast({
            icon: "none",
            title: "我被点击了"
          });
        }
      },
      "\u6309\u94AE"
    )
  );
}

`
