/**
 * Validates the elements of a branch are of the correct types
 * @param  {Object} branch the branch to validate
 * @throws {Error} if branch doesn't validate successfully
 */
validateBranch = function (branch) {
    check(branch, {
        type: Match.OneOf('Support', 'Sprint'),
        crmTaskNumber: Match.OneOf([Number], Number),
        name: String,
        sprints: Match.OneOf([Number], Number),
        description: String,
        team: Match.OneOf('Alpha Team', 'Astro Fan', 'IPAs and APIs'),
        createdOn: Match.Optional(Date),
        status: Match.OneOf('deprecated', 'created', 'deployed', 'mergedToMaster',
            'readyForMaster', 'prepareForMaster', 'inReview', 'readyForReview', 'inProgress'),
        contributors: Match.Optional(String),
        tests: Match.Optional({
            acceptance: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            },
            unit: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            },
            browser: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            }
        }),
        review: Match.Optional({
            ready: Match.Optional(Boolean),
            passed: Match.Optional(Boolean),
            reviewers: Match.Optional([String]),
        }),
        isPassingOnCI: Match.Optional(Boolean),
        mergeInfo: Match.Optional({
            sucessfulMergeFromMaster: Match.Optional(Boolean),
            mergedToMaster: Match.Optional(Boolean),
            masterCommitId: Match.Optional(String)
        }),
        isDeployed: Match.Optional(Boolean),
        isDeprecated: Match.Optional(Boolean)
    });
};

/**
 * A beautifully written function that gets the status of a branch in an incredibly
 * amazing way.
 * @param  {Object} branch the branch to get the status for
 * @return {String} the status of the branch
 */
getBranchStatus = function (branch) {
    if (branch.isDeprecated) {
        return 'deprecated';
    } else if (branch.contributors.length === 0) {
        return 'created';
    } else {
        if (branch.tests.acceptance.done !== false &&
            branch.tests.unit.done !== false &&
            branch.tests.browser.done !== false &&
            branch.isPassingOnCI &&
            branch.review.ready) {
            if (branch.review.reviewers.length > 0) {
                if (branch.review.passed) {
                    if (branch.mergeInfo.sucessfulMergeFromMaster) {
                        if (branch.mergeInfo.mergedToMaster && branch.mergeInfo.masterCommitId !== null) {
                            if (branch.isDeployed) {
                                return 'deployed';
                            }
                            return 'mergedToMaster';
                        }
                        return 'readyForMaster';
                    }
                    return 'prepareForMaster';
                }
                return 'inReview';
            }
            return 'readyForReview';
        }
        return 'inProgress';
    }
};

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
