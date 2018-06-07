module.exports = {
    round(num, accuracy) {
        var digits = +"1".padEnd(accuracy, "0");
        return Math.round(num * digits) / digits;
    }
}
