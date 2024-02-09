'use strict';

class TemplateProcessor {
    /**
     * Constructor for TemplateProcessor class.
     * @param {string} template The template string to process.
     */
    constructor(template) {
        this.template = template;
    }

    /**
     * Fills in placeholders in the template with values from the dictionary.
     * @param {object} dictionary Key-value pairs for replacing placeholders.
     * @returns {string} The template with placeholders replaced.
     */
    fillIn(dictionary) {
        let returnString = this.template;
        for (const property in dictionary) {
            if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
                const regex = new RegExp("{{" + property + "}}", "g");
                returnString = returnString.replace(regex, dictionary[property]);
            }
        }
        const regex = /{{.*?}}/g; // Updated regex to match non-greedy
        returnString = returnString.replace(regex, "");
        return returnString;
    }
}
