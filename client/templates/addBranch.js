Template.addBranch.helpers({

});

Template.addBranch.events({
    'click #addNewBranch': function () {
        var type = $('#type').val();
        var crmTaskNumber = Session.get('crmNumbers');
        var name = $('#name').val();
        var sprints = $('#sprints').val();
        var description = $('#description').val();
        var team = $('#team').val();

        if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
            return;
        }

        BranchList.insert({
            type: type,
            crmTaskNumber: crmTaskNumber,
            name: name,
            sprints: sprints,
            description: description,
            team: team,
            createdOn: new Date(),
            status: 'created',
            contributors: [],
            tests: {
                acceptance: {
                    done: false,
                    testers: []
                },
                unit: {
                    done: false,
                    testers: []
                },
                browser: {
                    done: false,
                    testers: []
                }
            },
            review: {
                ready: false,
                passed: false,
                reviewers: [],
            },
            isPassingOnCI: false,
            mergeInfo: {
                sucessfulMergeFromMaster: false,
                mergedToMaster: false,
                masterCommitId: null
            },
            isDeployed: false,
            isDeprecated: false
        });

        type = $('#type').val('');
        Session.set('crmNumbers', undefined);
        name = $('#name').val('');
        sprints = $('#sprints').val('');
        description = $('#description').val('');
        team = $('#team').val('');
    },

    'click #addCrmTaskNumber': function() {
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
