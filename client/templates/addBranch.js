Template.addBranch.helpers({

});

Template.addBranch.events({
    'click #submitNewBranch': function () {
        var type = $('#type').val();
        var crmTaskNumber = $('#crmTaskNumber').val();
        var name = $('#name').val();
        var sprints = $('#sprints').val();
        var description = $('#description').val();
        var team = $('#team').val();

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
    }
});
