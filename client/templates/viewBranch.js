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
        var crmTaskNumber = Session.get('crmNumbers');
        var name = $('#name').val();
        var sprints = $('#sprints').val();
        var description = $('#description').val();
        var team = $('#team').val();
        var contributors = $('#contributors').val();
        var reviewers = $('#reviewers').val();
        var masterCommitId = $('#masterCommitId').val();

        // convert strings into boolean - this is gross FIXME
        var isAcceptance = $('#isAcceptance').val() === 'true' && true || $('#isAcceptance').val() === 'false' && false || null;
        var isUnit = $('#isUnit').val() === 'true' && true || $('#isUnit').val() === 'false' && false || null;
        var isBrowser = $('#isBrowser').val() === 'true' && true || $('#isBrowser').val() === 'false' && false || null;
        var isPassingOnCI = $('#isPassingOnCI').val() === 'true' && true || $('#isPassingOnCI').val() === 'false' && false || null;
        var isReadyForReview = $('#isReadyForReview').val() === 'true' && true || $('#isReadyForReview').val() === 'false' && false || null;
        var isReviewed = $('#isReviewed').val() === 'true' && true || $('#isReviewed').val() === 'false' && false || null;
        var sucessfulMergeFromMaster = $('#sucessfulMergeFromMaster').val() === 'true' && true || $('#sucessfulMergeFromMaster').val() === 'false' && false || null;
        var mergedToMaster = $('#mergedToMaster').val() === 'true' && true || $('#mergedToMaster').val() === 'false' && false || null;
        var isDeployed = $('#isDeployed').val() === 'true' && true || $('#isDeployed').val() === 'false' && false || null;
        var isDeprecated = $('#isDeprecated').val() === 'true' && true || $('#isDeprecated').val() === 'false' && false || null;

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
            BranchList.update({_id: branchId}, {$set: branch});

            Session.set('crmNumbers', null);

            // redirect to home page
            Router.go('/');
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
