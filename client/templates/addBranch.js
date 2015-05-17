Template.addBranch.helpers({
    /**
     * Check to see if a branch has CRM task numbers
     * @return {Boolean}
     */
    'hasCrmTaskNumbers': function () {
        return $.isArray(Session.get('crmNumbers')) && Session.get('crmNumbers').length > 0;
    },

    /**
     * @return {String} array of CRM numbers converted to a string
     */
    'getCrmTaskNumbers': function () {
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
        // convert string into array of numbers
        var sprints = $('#sprints').val().split(', ').map(Number);
        var description = $('#description').val();
        var team = $('#team').val();

        if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
            return sAlert.error('Please fill in all required fields');
        }

        var branch = {
            type: type,
            crmTaskNumber: crmTaskNumber,
            name: name,
            sprints: sprints,
            description: description,
            team: team,
            status: 'created'
        };

        Meteor.call('addBranch', branch, function (error) {
            if (error) {
                var message = getErrorMessage(error);
                return sAlert.error(message);
            }

            Session.set('crmNumbers', null);
            Session.set('branchSuccess', {name: name, type: 'created'});

            // redirect to home page
            Router.go('/');
        });
    },

    'click #addCrmTaskNumber, keypress #crmTaskNumber': handleAddCrmTaskNumber
});

