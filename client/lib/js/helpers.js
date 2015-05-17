getBooleanFromString = function (string) {
    string = $.trim(string.toLowerCase());
    return string === 'true' ? true : string === 'false' ? false : null;
};

getErrorMessage = function (error) {
    return error.reason === 'Match failed' && 'Validation failed, please check you filled the form in correctly.' ||
        'An unexpected error occured, please quote error code igds78fsd6f8s7dtfiusdufsid829 if contacting Mayden support.';
};

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

getCrmValidationMessage = function (taskNumber, crmNumbers) {
    if (taskNumber === null || taskNumber === '') {
        return 'Please enter a task number';
    } else if (!($.isNumeric(taskNumber) && Math.floor(taskNumber) === taskNumber)) {
        return 'A task number must be an integer';
    } else if ($.inArray(taskNumber, crmNumbers) !== -1) {
        return 'You can\'t list the same task number twice';
    }

    return false;
};
