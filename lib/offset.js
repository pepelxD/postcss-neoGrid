const tools = require('./tools');

module.exports = function(rule, options) {
    let ratio = options.wrapper / 100;
    let minSize = options.wrapper / options.columns;
    let offsetPercent = (options.offset / ratio);

    rule.walkDecls('offset', (decl) => {
        let offsetSize = parsfloat(decl.value, 10);
        if (isNaN(offsetSize)) {
            throw decl.error('Offset value is not a number', { plugin: 'postcss-neogrid', word: decl.value});
        }
        let colSize = minSize / ratio * offsetSize;
        let offset = offsetPercent / 2;
        rule.append({
            prop: 'margin-left',
            value:  `${tools.round(offset + colSize)}%`
        });
    });
}
