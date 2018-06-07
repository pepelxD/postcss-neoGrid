const getDuple = require('./getDuplicate.js');

module.exports = function (rule, options) {
    rule.walkDecls('wrapper', (decl) => {
        let values = decl.value !== '""' ? decl.value.split(' ') : [options.wrapper];
        options.wrapper = parseFloat(values[0], 10);
        let unit = isNaN(values[0]) ? values[0].replace(/[^a-zA-Z]/g, '').toLowerCase() : options.unit;
        let size = parseFloat(values[0], 10) + unit;
        let maxWidth = getDuple(/^max-width/i, rule);
        if(maxWidth.length > 0) {
            maxWidth.forEach(item => {
                let value = options.duple === 'remove' ? size : item.value;
                rule.append({
                    prop: item.prop,
                    value: item.value
                });
            });
        } else {
            rule.append({
                prop: 'max-width',
                value: size
            });
        }

        let margins = getDuple(/^margin/i, rule);
        margins.forEach(item => {
            if (item.prop !== 'margin-left' && item.prop !== 'margin-right') {
                rule.append({
                    prop: item.prop,
                    value: item.value
                });
            }
        });
        if (values.length > 1) {
            if (values[1] === 'right') {
                rule.append({
                    prop: 'margin-left',
                    value: 'auto'
                });
            }
        } else {
            rule.append({
                prop: 'margin-left',
                value: 'auto'
            },
            {
                prop: 'margin-right',
                value: 'auto'
            });
        }
            let paddings = getDuple(/^padding/i, rule);
            if(paddings.length > 0) {
                let existLeftProp = false;
                let existRightProp = false;
                paddings.forEach(item => {
                    if (item.prop === 'padding-left') {
                        existLeftProp = true;
                    }
                    if (item.prop === 'padding-right') {
                        existRightrop = true;
                    }
                });
                if (!existLeftProp) {
                    paddings.push({prop: 'padding-left', value: options.fields});
                }
                if (!existRightProp) {
                    paddings.push({prop: 'padding-right', value: options.fields});
                }
                paddings.forEach(item => {
                    let prop = item.prop;
                    let value = item.value;
                    if (item.prop === 'padding-left' || item.prop === 'padding-right') {
                        value = options.duple === 'remove' ? options.fields + options.unit : value;
                    }
                    rule.append({
                        prop: item.prop,
                        value: value
                    });
                });
            } else {
                if (options.fields) {
                    rule.append({
                        prop: 'padding-left',
                        value: options.fields + options.unit
                    },
                    {
                        prop: 'padding-right',
                        value: options.fields + options.unit
                    });
                }
            }
        decl.remove();
    });
};
