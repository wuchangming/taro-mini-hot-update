export const reactPolyfill = `
    var View = {
        type: 'View'
    };
    var Text = {
        type: 'Text'
    };
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
