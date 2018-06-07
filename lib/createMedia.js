let unitList = ['px', 'cm', 'mm', '%', 'ch', 'pica', 'in', 'em', 'rem', 'pt', 'pc', 'ex', 'vw', 'vh', 'vmin', 'vmax'];
function getRoot(node) {
    let type = node.type;
    while(type !== 'root') {
        node = node.root();
        type = node.type;
    }
    return node;
}

module.exports = function(rule, options, postcss) {
    let mediaParams = null;
    let params = options.mediaOptions.slice(options.mediaOptions.indexOf('(') + 1, options.mediaOptions.lastIndexOf(')')).trim();
    params = parseInt(params) ? params.split(' ') : params;
    switch (typeof params) {
        case 'object' :
            params.forEach(item => {
                if (!parseInt(item)) {
                    throw rule.error('Media query parametr is not a number', { plugin: 'postcss-neogrid', input: rule.error.file});
                }
            });
            let unit = isNaN(params[0]) ? params[0].replace(/[^a-zA-Z]/g, '').toLowerCase() : options.unit;
            unit = unitList.includes(unit) ? unit : options.unit;
            mediaParams = params.length > 1 ? `(min-width: ${parseFloat(params[0], 10)}${unit}) and (max-width: ${parseFloat(params[1], 10)}${unit})` : `(max-width: ${parseFloat(params[0], 10)}${unit})`;
            break;
        case 'string' :
            mediaParams = params;
            break;
        default :
            break;
    }
    let root = getRoot(rule);
    let selector = postcss.rule({ selector: options.selector.name});
    options.selector.rules.forEach(item => {
        selector.append({
            prop: item.prop,
            value: item.value
        });
     });

    let media = postcss.atRule({name: 'media', params: mediaParams});
    media.append(selector);
    root.append(media);
    if (options.removeRule) {
        rule.remove();
    }
};
