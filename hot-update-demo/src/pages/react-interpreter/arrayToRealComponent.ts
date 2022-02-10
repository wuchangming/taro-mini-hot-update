import React from 'react'
import { View, Text } from '@tarojs/components'

type SupportType = {
    type: 'View' | 'Text'
}

export type CompObj = [SupportType | string, object | null, CompObj[]]

export function arrayToRealComponent(compObj: CompObj) {
    if (compObj === null || typeof compObj === 'string' ) {
        return compObj
    }

    const typeOrString = compObj[0]

    if (typeof typeOrString === 'string') {
        return compObj[0]
    }

    const props = compObj[1]
    const children = compObj[2]

    let Comp: React.ComponentType

    switch ((typeOrString as SupportType).type) {
        case 'View':
            Comp = View
            break
        case 'Text':
            Comp = Text
            break
    }

    if (Comp === undefined) {
        throw '不支持当前 Component 类型: ' + typeOrString
    }

    if (typeof children === 'string' || children === null) {
        return React.createElement(Comp, props, children)
    } else if (Array.isArray(children)) {
        const childrenElement = children.map((subCom: CompObj) => {
            return arrayToRealComponent(subCom)
        })
        return React.createElement(Comp, props, ...childrenElement)
    }
}
