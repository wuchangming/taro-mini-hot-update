import { polyfillComponents } from './polyfillComponents'

export const reactPolyfill = `
    ${Object.keys(polyfillComponents)
        .map(k => {
            return `var ${k} = {
              type: "${k}"
            };`
        })
        .join('')}
    var React = {
        createElement: function(component, props) {
            return [
                component,
                props,
                arguments.slice(2)
            ]
        }
    }
`
