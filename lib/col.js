const getDuple = require('./getDuplicate.js');
const createMedia = require('./createMedia');
const tools = require('./tools');



module.exports = function(rule, options, postcss) {
    let ratio = options.wrapper / 100;
    let minSize = options.wrapper / options.columns;

    let offsetPercent = (options.offset / ratio);
    rule.walkDecls('col', (decl) => {
        let offset = options.offsetWithPercent ? `${tools.round(offsetPercent / 2, options.roundSize)}%` : `${tools.round(options.offset / 2, options.roundSize)}px`;
        let margins = getDuple(/^margin/i, rule);
        margins.forEach(item => {
            if (item.prop !== 'margin-left' && item.prop !== 'margin-right') {
                rule.append({
                    prop: item.prop,
                    value: item.value
                });
            }
        });

        if (options.grid === 'inline-block') {
            rule.append({
                prop: 'display',
                value: 'inline-block'
            },
            {
                prop: 'word-spacing',
                value: 'normal'
            });
        }

        rule.append({
            prop: 'margin-left',
            value:  offset
        },
        {
            prop: 'margin-right',
            value:  offset
        });


        decl.remove();
    });
    rule.walkDecls('col-size', (decl) => {
        let colSize = decl.value.match(/^\d+/i)[0];
        let media = decl.value.replace(/^\d+/i, '');
        let size = tools.round((minSize / ratio * colSize), options.roundSize);
        let computedSize = !options.useCalc ? `${size - offsetPercent}%` : `calc(${size}% - ${options.offset}px)`;
        if (!media) {
            rule.append({
                prop: 'width',
                value:  computedSize
            });
        }
        if (media) {
            createMedia(rule, {
                mediaOptions: `(${media})`,
                unit: options.unit,
                mobileFirst: options.mobileFirst,
                removeRule: false,
                selector: {
                    name: rule.selector,
                    rules: [{prop: 'width', value: computedSize}]
                }
            }, postcss);
        }

        decl.remove();
    });
};
