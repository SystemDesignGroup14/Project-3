'use strict';
class TableTemplate {
    /**
     * Updates the table based on dictionary values.
     * Headers and cells with template strings are replaced with dictionary values.
     * Updates only cells in a specified column if columnName is provided.
     * If no columnName is given, all cells are updated.
     * Ensures the table is visible after updates.
     * 
     * @param {string} tableId The ID of the table to update.
     * @param {object} dictionary Key-value pairs for replacing template strings.
     * @param {string} [columnName] The name of the column to specifically update (optional).
     */
    static fillIn(tableId, dictionary, columnName) {
        const table = document.getElementById(tableId);
        if (!table) {
            console.error(`Table with ID "${tableId}" not found.`);
            return;
        }

        // Replace template strings with values from the dictionary.
        const replaceTemplateString = (text) => text.replace(/{{(\w+)}}/g, (match, key) => dictionary[key] || '');

        let columnIndex = null;
        const headers = table.rows[0].cells;
        for (let i = 0; i < headers.length; i++) {
            const newText = replaceTemplateString(headers[i].innerHTML);
            headers[i].innerHTML = newText;
            if (columnName && newText === columnName) {
                columnIndex = i;
            }
        }

        // Update cells if no columnName is specified or if it matches the column being iterated.
        Array.from(table.rows).slice(1).forEach(row => {
            Array.from(row.cells).forEach((cell, index) => {
                if (columnIndex === null || index === columnIndex) {
                    cell.innerHTML = replaceTemplateString(cell.innerHTML);
                }
            });
        });

        table.style.visibility = 'visible';
    }
}
