const postcss = require('postcss');
const mergee = require('deepmerge');

const wrap = require('./lib/wrapper');
const media = require('./lib/media');
const row = require('./lib/row');
const col = require('./lib/col');
const offset = require('./lib/offset');

let workers = [
    wrap,
    media,
    row,
    col,
    offset
];

let defaultOpts = {
    wrapper: 1200, // ширина основного контейнера
    grid: 'flex', // inline-block
    columns: 12, // количество колонок
    fields: 5, // поля сайта padding у враппера
    offset: 30, // межколоночник
    offsetWithPercent: false, //  Переводит межколночник в проценты
    useCalc: false, // использовать ли функцию calc
    duple: 'remove', // удаляет дублирующие правила
    roundSize: 4
};

module.exports = postcss.plugin('postcss-neoGrid', (opts = {}) => {
    let options = mergee(defaultOpts, opts);
    options.unit = 'px';
    return (root) => {
        root.walkRules((rule) => {
            workers.forEach(worker => worker(rule, options, postcss));
        });
    };

});
