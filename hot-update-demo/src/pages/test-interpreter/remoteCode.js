/* eslint-disable */

function FuncComponent(props) {
    return /*#__PURE__*/ React.createElement(
        View,
        {
            style: {
                backgroundColor: 'red',
            },
        },
        props.displayTitle === true ? /*#__PURE__*/ React.createElement(Text, null, 'This is Title') : null,
        /*#__PURE__*/ React.createElement(Text, null, ' --- \u901A\u8FC7\u5B57\u7B26\u4E32\u4EE3\u7801\u751F\u6210'),
        /*#__PURE__*/ React.createElement(
            Button,
            {
                onClick: function onClick() {
                    Taro.showToast({
                        icon: 'none',
                        title: '我被点击了🤔',
                    })
                },
            },
            '\u6309\u94AE'
        ),
        /*#__PURE__*/ React.createElement(Image, {
            src: 'https://www.baidu.com/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png',
        })
    )
}
