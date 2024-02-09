'use strict';

class TableTemplate {
    /**
     * Fills in the table with the provided data.
     * Replaces template strings in the table headers and cells with corresponding values from the dictionary.
     * If a columnName is specified, only the cells in that column will be updated.
     * If no columnName is specified, all cells in the table will be updated.
     * @param {string} tableId - The ID of the table element.
     * @param {object} dictionary - The dictionary containing the values to replace the template strings.
     * @param {string} [columnName] - The name of the column to update. Optional.
     */
    static fillIn(tableId, dictionary, columnName) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error('Table not found:', tableId);
            return;
        }

        // Helper function to perform template replacement
        function replaceTemplateString(text) {
            return text.replace(/{{(\w+)}}/g, (match, key) => dictionary[key] || '');
        }

        // Update table headers
        const headers = table.rows[0].cells;
        let columnIndex = columnName ? -1 : null; // null for full table processing
        for (let i = 0; i < headers.length; i++) {
            headers[i].innerHTML = replaceTemplateString(headers[i].innerHTML);
            if (headers[i].textContent === columnName) {
                columnIndex = i;
            }
        }

        // Update table cells
        for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
            const row = table.rows[rowIndex];
            for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                if (columnIndex === null || cellIndex === columnIndex) {
                    row.cells[cellIndex].innerHTML = replaceTemplateString(row.cells[cellIndex].innerHTML);
                }
            }
        }

        // Make the table visible after processing
        table.style.visibility = 'visible';
    }
}
