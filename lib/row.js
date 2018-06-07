const getDuple = require('./getDuplicate.js');

module.exports = function(rule, options) {
    rule.walkDecls('row', (decl) => {
        let ratio = options.wrapper / 100;
        let offsetPercent = (options.offset / ratio).toFixed(options.roundSize);
        let offset = options.offsetWithPercent ? `${offsetPercent / -2}%` : `${options.offset / -2}px`;
        let margins = getDuple(/^margin/i, rule);
        margins.forEach(item => {
            if (item.prop !== 'margin-left' && item.prop !== 'margin-right') {
                rule.append({
                    prop: item.prop,
                    value: item.value
                });
            }
        });
        rule.append({
            prop: 'margin-left',
            value: offset
        },
        {
            prop: 'margin-right',
            value: offset
        });
        switch(options.grid) {
            case 'flex' :
                rule.append({
                    prop: 'display',
                    value: 'flex'
                },
                {
                    prop: 'flex-wrap',
                    value: 'wrap'
                });
                break;
            case 'inline-block' :
            rule.append({
                prop: 'font-size',
                value: '16px'
            },
            {
                prop: 'word-spacing',
                value: '4px'
            });
            break;
        }


        decl.remove();
    });
};
