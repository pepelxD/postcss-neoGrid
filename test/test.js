var postcss = require('postcss');

var plugin = require('../');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

// Write tests here
let rowFlex = {
    in: `.row {
        row: "";
    }`,
    out: `.row {
        margin-left: -15px;
        margin-right: -15px;
        display: flex;
        flex-wrap: wrap;
    }`
};
let rowInline = {
    in: `.row {
        row: "";
    }`,
    out: `.row {
        margin-left: -15px;
        margin-right: -15px;
        font-size: 16px;
        word-spacing: 4px;
    }`
};
let wrapper = {
    in: `.wrapper {
        wrapper: "";
    }`,
    out: `.wrapper {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 5px;
        padding-right: 5px;
    }`
};
let colFlex = {
    in: `.col {
        col: "";
        col-size: 4;
    }`,
    out: `.col {
        margin-left: 15px;
        margin-right: 15px;
        width: 30.8333%;
    }`
};
let colInline = {
    in: `.col {
        col: "";
        col-size: 4;
    }`,
    out: `.col {
        display: inline-block;
        word-spacing: normal;
        margin-left: 15px;
        margin-right: 15px;
        width: 30.8333%;
    }`
}
it('row rule flex', () => {
    return run(rowFlex.in, rowFlex.out, {});
});
it('row rule inline-block', () => {
    return run(rowInline.in, rowInline.out, { grid: 'inline-block' });
});
it('wrapper rule', () => {
    return run(wrapper.in, wrapper.out, {});
});
it('col rule flex', () => {
    return run(colFlex.in, colFlex.out, {});
});
it('col rule inline', () => {
    return run(colInline.in, colInline.out, {grid: 'inline-block'});
});


