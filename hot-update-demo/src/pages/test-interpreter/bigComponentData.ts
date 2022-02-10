export const bigCode = `
function FuncComponent(props) {
  return /*#__PURE__*/ React.createElement(
    View,
    {
      style: {
        backgroundColor: "yellow",
      }
    },
    ${new Array(200).fill(null).map(() => {
        return `props.displayTitle === true
      ? /*#__PURE__*/ React.createElement(Text, null, "This is Title")
      : null,
    /*#__PURE__*/ React.createElement(Text, null, " --- 通过字符串代码动态生成")`
    }).join(',')}
  );
}
`
