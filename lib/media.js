const createMedia = require('./createMedia');

module.exports = function(rule, options, postcss) {
    rule.walkRules(/^media/i, (rule) => {
        let settings = {
            mediaOptions: rule.selector,
            unit: options.unit,
            mobileFirst: options.mobileFirst,
            removeRule: true,
            selector: {
                name: rule.root().nodes[0].selector,
                rules: rule.nodes
            }
        };

        createMedia(rule, settings, postcss);
    });
};
