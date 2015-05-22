Template.viewBranch.helpers({
    'isSelected': function (option, value) {
        return option === value && true || false;
    }
});

var getBranchFields = function () {
   var branch;
    try {
        branch = getMainBranchFields();

        // grab the rest of the fields and add them to the branch object
        $.extend(true, branch, {
            contributors: $('#contributors').val(),
            tests: {
                acceptance: {
                    done: getBooleanFromString($('#isAcceptance').val()),
                    testers: []
                },
                unit: {
                    done: getBooleanFromString($('#isUnit').val()),
                    testers: []
                },
                browser: {
                    done: getBooleanFromString($('#isBrowser').val()),
                    testers: []
                }
            },
            isPassingOnCI: getBooleanFromString($('#isPassingOnCI').val()),
            review: {
                ready: getBooleanFromString($('#isReadyForReview').val()),
                passed: getBooleanFromString($('#isReviewed').val()),
                reviewers: $('#reviewers').val().length > 0 && getArrayFromString($('#reviewers').val()) || [],
            },
            mergeInfo: {
                sucessfulMergeFromMaster: getBooleanFromString($('#sucessfulMergeFromMaster').val()),
                mergedToMaster: getBooleanFromString($('#mergedToMaster').val()),
                masterCommitId: $('#masterCommitId').val(),
            },
            isDeployed: getBooleanFromString($('#isDeployed').val()),
            isDeprecated: getBooleanFromString($('#isDeprecated').val())
        });
    } catch (error) {
        return sAlert.error(error.message);
    }

    return branch;
};

Template.viewBranch.events({
    'click #updateBranch': function () {
        var branchId = this._id;
        var branch;

        try {
            branch = getBranchFields();
        } catch (error) {
            return sAlert.error(error.message);
        }

        // need a callback to make this a synchronous request
        Meteor.call('updateBranch', branchId, branch, function (error) {
            if (error) {
                var message = getErrorMessage(error);
                return sAlert.error(message);
            }

            Session.set('branchSuccess', {
                name: branch.name,
                type: 'updated'
            });

            // redirect to home page
            Router.go('/');
        });

    }
});
