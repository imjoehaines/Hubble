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
 * Handles event fired when trying to add a new CRM number
 * @param  {Object} event the event that fired
 */
handleAddCrmTaskNumber = function (event) {
    // if this is a keypress event make sure the key is return
    if (event.type === 'keypress' && event.which !== 13) { return; }

    var taskNumber = $('#crmTaskNumber').val();
    var crmNumbers = Session.get('crmNumbers') || [];

    var message = getCrmValidationMessage(taskNumber, crmNumbers);

    if (message !== false) {
        var validationAlert = Session.get('validationAlert');
        sAlert.close(validationAlert);
        return Session.set('validationAlert', sAlert.error(message));
    }

    crmNumbers.push(taskNumber);

    Session.set('crmNumbers', crmNumbers);

    $('#crmTaskNumber').val('');

    $('#crmNumbers').html(crmNumbers.join(', '));
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
