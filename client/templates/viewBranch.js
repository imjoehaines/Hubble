Template.viewBranch.helpers({
    'hasCrmTaskNumbers': function () {
        var branch = BranchList.findOne({_id: this._id});

        if (branch) {
            Session.set('crmNumbers', branch.crmTaskNumber);

            return branch.crmTaskNumber &&
                branch.crmTaskNumber.length > 0;
        }
    },

    'getCrmTaskNumbers': function () {
        return BranchList.findOne({_id: this._id}).crmTaskNumber.join(', ');
    },

    'isSelected': function (option, value) {
        return option === value && true || false;
    }
});

var getBranchFields = function () {
    var type = $('#type').val();
    var name = $('#name').val();
    var crmTaskNumber = Session.get('crmNumbers');

    // convert string into array of numbers
    var sprints = $('#sprints').val().length > 0 && $('#sprints').val().split(', ').map(Number) || null;
    var description = $('#description').val();
    var team = $('#team').val();

    if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
        throw new Error('Please fill in all required fields');
    }

    var branch = {
        type: type,
        crmTaskNumber: crmTaskNumber,
        name: name,
        sprints: sprints,
        description: description,
        team: team,
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
            reviewers: $('#reviewers').val().length > 0 && $('#reviewers').val().split(', ') || [],
        },
        mergeInfo: {
            sucessfulMergeFromMaster: getBooleanFromString($('#sucessfulMergeFromMaster').val()),
            mergedToMaster: getBooleanFromString($('#mergedToMaster').val()),
            masterCommitId: $('#masterCommitId').val(),
        },
        isDeployed: getBooleanFromString($('#isDeployed').val()),
        isDeprecated: getBooleanFromString($('#isDeprecated').val())
    };

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

            Session.set('crmNumbers', null);
            Session.set('branchSuccess', {
                name: branch.name,
                type: 'updated'
            });

            // redirect to home page
            Router.go('/');
        });

    },

    'click #addCrmTaskNumber, keypress #crmTaskNumber': handleAddCrmTaskNumber
});
