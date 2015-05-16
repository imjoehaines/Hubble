Template.viewBranch.helpers({
    'hasCrmTaskNumbers': function() {
        if (BranchList.findOne({_id: this._id})) {
            Session.set('crmNumbers', BranchList.findOne({_id: this._id}).crmTaskNumber);

            return BranchList.findOne({_id: this._id}).crmTaskNumber &&
                BranchList.findOne({_id: this._id}).crmTaskNumber.length > 0;
        }
    },

    'getCrmTaskNumbers': function() {
        return BranchList.findOne({_id: this._id}).crmTaskNumber.join(', ');
    },

    'isSelected': function(option, value) {
        return option === value && true || false;
    }
});

Template.viewBranch.events({
    'click #updateBranch': function () {
        var branchId = this._id;

        var type = $('#type').val();
        var name = $('#name').val();
        var sprints = $('#sprints').val();
        var description = $('#description').val();
        var team = $('#team').val();
        var contributors = $('#contributors').val();
        var reviewers = $('#reviewers').val();
        var masterCommitId = $('#masterCommitId').val();

        var crmTaskNumber = Session.get('crmNumbers');

        var isAcceptance = getBooleanFromString($('#isAcceptance').val());
        var isUnit = getBooleanFromString($('#isUnit').val());
        var isBrowser = getBooleanFromString($('#isBrowser').val());
        var isPassingOnCI = getBooleanFromString($('#isPassingOnCI').val());
        var isReadyForReview = getBooleanFromString($('#isReadyForReview').val());
        var isReviewed = getBooleanFromString($('#isReviewed').val());
        var sucessfulMergeFromMaster = getBooleanFromString($('#sucessfulMergeFromMaster').val());
        var mergedToMaster = getBooleanFromString($('#mergedToMaster').val());
        var isDeployed = getBooleanFromString($('#isDeployed').val());
        var isDeprecated = getBooleanFromString($('#isDeprecated').val());

        if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
            return;
        }

        var branch = {
            type: type,
            crmTaskNumber: crmTaskNumber,
            name: name,
            sprints: sprints,
            description: description,
            team: team,
            contributors: contributors,
            tests: {
                acceptance: {
                    done: isAcceptance,
                    testers: []
                },
                unit: {
                    done: isUnit,
                    testers: []
                },
                browser: {
                    done: isBrowser,
                    testers: []
                }
            },
            review: {
                ready: isReadyForReview,
                passed: isReviewed,
                reviewers: reviewers,
            },
            isPassingOnCI: isPassingOnCI,
            mergeInfo: {
                sucessfulMergeFromMaster: sucessfulMergeFromMaster,
                mergedToMaster: mergedToMaster,
                masterCommitId: masterCommitId,
            },
            isDeployed: isDeployed,
            isDeprecated: isDeprecated
        };

        // need a callback to make this a synchronous request
        Meteor.call('getBranchStatus', branch, function (error, status) {
            if (error) { return; } // TODO: do something with error

            branch.status = status;

            Meteor.call('updateBranch', branchId, branch, function (error) {
                if (error) { return; }

                Session.set('crmNumbers', null);

                // redirect to home page
                Router.go('/');
            });
        });

    },

    'click #addCrmTaskNumber, keypress #crmTaskNumber': function(event) {
        // if this is a keypress event make sure the key is return
        if (event.type === 'keypress' && event.which !== 13) { return; }

        var taskNumber = $('#crmTaskNumber').val();
        var crmNumbers = Session.get('crmNumbers') || [];

        if (taskNumber === null || taskNumber === '' ||
            $.inArray(taskNumber, crmNumbers) !== -1 || !$.isNumeric(taskNumber)) {
            return;
        }

        crmNumbers.push(taskNumber);

        Session.set('crmNumbers', crmNumbers);

        $('#crmTaskNumber').val('');

        $('#crmNumbers').html(crmNumbers.join(', '));
    }

});
