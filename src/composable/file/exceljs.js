const formatBorderTable = (
        worksheet,                                  // worksheet
        start = {row: 1, col: 1},                   // Địa chỉ ô bắt đầu của bảng
        end = {row: 1, col: 1},                     // Địa chỉ ô kết thúc của bảng
        end_row_header_table = 1,                   // Dòng cuối cùng của header table
        borderWidth = 'thin',                       // Kiểu đường viền
    ) => {

    const borderStyle = { style: borderWidth };

    const fontBold = { bold: true };

    for(let c = start.col; c <= end.col; c++){ // Dịch chuyển cột
        var maxLength = 5;
        for (let r = start.row; r <= end.row; r++) { // Dịch chuyển dòng trong cột

            const cell = worksheet.getCell(r, c);
            cell.border = {
                top: borderStyle,
                left: borderStyle,
                bottom: borderStyle,
                right: borderStyle
            };

            if(r <= end_row_header_table) {
                cell.font = fontBold
                cell.alignment = { vertical: 'center', horizontal: 'center' };
            }
            
            // Width column
            var columnLength = (typeof cell.value === 'string') ? cell.value.toString().length : maxLength;
            if (columnLength > maxLength ) {
                maxLength = columnLength
                worksheet.getColumn(c).width = maxLength + 1
            } 
        }
    }
};


// Export function
export {
    formatBorderTable
}