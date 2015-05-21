/**
 * Horrible function to convert a string "boolean" into an actual boolean
 * @param  {String} string the string to convert
 * @return {Boolean|null} the converted boolean value or null if string is not 'true'/'false'
 */
getBooleanFromString = function (string) {
    string = $.trim(string.toLowerCase());
    return string === 'true' ? true : string === 'false' ? false : null;
};

/**
 * Gets a user-appropriate error message
 * @param  {Meteor.Error} error a meteor error, probably from the server
 * @return {String} an error message
 */
getErrorMessage = function (error) {
    return error.reason === 'Match failed' && 'Validation failed, please check you filled the form in correctly.' ||
        'An unexpected error occured, please quote error code igds78fsd6f8s7dtfiusdufsid829 if contacting Mayden support.';
};

/**
 * Gets a validation message when trying to add a CRM number
 * @param  {mixed} taskNumber the number trying to be added
 * @param  {Array} crmNumbers an array of already added nubers
 * @return {String|false} a message is failed validation, otherwise false
 */
getCrmValidationMessage = function (taskNumber, crmNumbers) {
    if (taskNumber === null || taskNumber === '') {
        return 'Please enter a task number';
    } else if (!($.isNumeric(taskNumber)) && Math.floor(taskNumber) !== taskNumber) {
        return 'A task number must be an integer';
    } else if ($.inArray(taskNumber, crmNumbers) !== -1) {
        return 'You can\'t list the same task number twice';
    }

    return false;
};

/**
 * Gets the main fields for a branch (type, crmTaskNumber, name, sprints,
 * description & team)
 * @return {Object} An object with the main branch fields
 */
getMainBranchFields = function () {
    var type = $('#type').val();
    var name = $('#name').val();
    var description = $('#description').val();
    var team = $('#team').val();

    // convert strings into array of numbers
    var crmTaskNumber = $('#crmTaskNumber').val().length > 0 &&
        $('#crmTaskNumber').val().replace(' ', '').split(',').map(Number) || null;
    var sprints = $('#sprints').val().length > 0 &&
        $('#sprints').val().replace(' ', '').split(',').map(Number) || null;

    if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
        throw new Error('Please fill in all required fields');
    }

    return {
        type: type,
        crmTaskNumber: crmTaskNumber,
        name: name,
        sprints: sprints,
        description: description,
        team: team
    };
};
