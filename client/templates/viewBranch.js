Template.viewBranch.events({
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
        Session.set('crmNumbers', undefined);
        name = $('#name').val('');
        sprints = $('#sprints').val('');
        description = $('#description').val('');
        team = $('#team').val('');
    },
});
