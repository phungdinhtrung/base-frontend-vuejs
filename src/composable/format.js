const formatNumber = (number, dec_point = ',', thousands_sep = '.', digit = 2) => {
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = parseFloat(number).toFixed(digit).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}

const roundNumber = (number, digit) => {
    if(number) return parseFloat(number.toFixed(digit))
    return ''
}

// Export function
export {
    formatNumber,
    roundNumber
}