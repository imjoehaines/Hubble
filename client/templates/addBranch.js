Template.addBranch.helpers({

});

Template.addBranch.events({
    'click #submitNewBranch': function () {
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
            status: 'created'
        });

        type = $('#type').val('');
        crmTaskNumber = $('#crmTaskNumber').val('');
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
