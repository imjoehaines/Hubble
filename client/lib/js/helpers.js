getBooleanFromString = function (string) {
    string = $.trim(string.toLowerCase());
    return string === 'true' ? true : string === 'false' ? false : null;
};

getErrorMessage = function (error) {
    return error.reason === 'Match failed' && 'Validation failed, please check you filled the form in correctly.' ||
        'Unexpected error, please quote error code igds78fsd6f8s7dtfiusdufsid829 if contacting Mayden support.';
};
