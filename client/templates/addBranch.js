Template.addBranch.helpers({
    'hasCrmTaskNumbers': function() {
        return $.isArray(Session.get('crmNumbers')) && Session.get('crmNumbers').length > 0;
    },

    'getCrmTaskNumbers': function() {
        return $.isArray(Session.get('crmNumbers')) && Session.get('crmNumbers').join(', ');
    }
});

Template.addBranch.created = function () {
    Session.set('crmNumbers', null);
};

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

        var branch = {
            type: type,
            crmTaskNumber: crmTaskNumber,
            name: name,
            sprints: sprints,
            description: description,
            team: team,
            createdOn: new Date(),
            status: 'created',
            contributors: null,
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
        };

        Meteor.call('addBranch', branch, function (error) {
            if (error) { return error; }

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
