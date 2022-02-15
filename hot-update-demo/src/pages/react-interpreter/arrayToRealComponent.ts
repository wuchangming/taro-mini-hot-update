import React from 'react'
import { polyfillComponents } from './polyfillComponents'

type SupportType = {
    type: keyof typeof polyfillComponents
}

export type CompObj = [SupportType | string, object | null, CompObj[]]

export function arrayToRealComponent(compObj: CompObj) {
    if (compObj === null || typeof compObj === 'string') {
        return compObj
    }

    const typeOrString = compObj[0]

    if (typeof typeOrString === 'string') {
        return compObj[0]
    }

    const props = compObj[1]
    const children = compObj[2]

    const Comp: React.ComponentType = polyfillComponents[(typeOrString as SupportType).type]

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
