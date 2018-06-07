let map = require('./propsMap.json');
module.exports = function (template, css) {
    let properties = [];
    css.nodes.forEach((item) => {
       if (item.prop && item.prop.search(template) !== -1) {
           let prop = item.prop.match(template)[0].toLowerCase();
           let values = item.value.split(' ');
           if (item.prop.toLowerCase() === prop && prop in map) {
               switch (values.length) {
                   case 1 :
                    map[prop].forEach(decl => {
                        properties.push({
                            prop: decl,
                            value: values[0]
                        });
                    });
                    break;
                    case 2 :
                    map[prop].forEach((decl, i) => {
                        let value = i % 2 === 0 ? values[0] : values[1];
                        properties.push({
                            prop: decl,
                            value: value
                        });
                    });
                    break;
                    case 3 :
                    map[prop].forEach((decl, i) => {
                        let value = i === 3 ? values[1] : values[i];
                        properties.push({
                            prop: decl,
                            value: value
                        });
                    });
               }

           } else {
                properties.push({
                    prop: item.prop.toLowerCase(),
                    value: values[0]
                });
           }
           item.remove();
       }
    });

    return properties;
};

/*
Алгоритм: функция возвращает массив из набора правил которые совпали
из результата сравнения существующих с теми которые должен добавить плагин,
при этом составные правила такие как margin и padding разворачиваются.
*/
