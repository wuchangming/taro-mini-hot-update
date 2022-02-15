/**
JSX: 内容
*/

// function FuncComponent(props: { displayTitle: boolean }) {
//     return (
//         <View style={{ backgroundColor: 'red' }}>
//             {props.displayTitle === true ? <Text>This is Title</Text> : null}
//             <Text> --- 通过常规代码生成</Text>
//         </View>
//     )
// }

/*
下面为 Babel 转换后
 */

export const basicCode = `
function FuncComponent(props) {
  return /*#__PURE__*/ React.createElement(
    View,
    {
      style: {
        backgroundColor: "red"
      },
      onClick: function () {
        toast('props.displayTitle = ' + props.displayTitle);
      }
    },
    props.displayTitle === true
      ? /*#__PURE__*/ React.createElement(Text, null, "This is Title")
      : null,
    /*#__PURE__*/ React.createElement(
      Text,
      null,
      " --- \u901A\u8FC7\u5B57\u7B26\u4E32\u4EE3\u7801\u751F\u6210"
    )
  );
}
`
