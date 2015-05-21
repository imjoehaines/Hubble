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
    var message = 'An unexpected error occured, please quote error code igds78fsd6f8s7dtfiusdufsid829 if contacting Mayden support.';

    // if this is a validation error, tell the user
    if (_.isObject(error) && _.has(error, 'reason') && error.reason === 'Match failed') {
        message = 'Validation failed, please check you filled the form in correctly.';
    }

    return message;
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
