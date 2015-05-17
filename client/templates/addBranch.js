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
            createdOn: new Date(),
            status: 'created'
        };

        Meteor.call('addBranch', branch, function (error) {
            if (error) {
                var message = getErrorMessage(error);
                return sAlert.error(message);
            }

            Session.set('crmNumbers', null);
            Session.set('branchSuccess', {
                name: name,
                type: 'created'
            });

            // redirect to home page
            Router.go('/');
        });
    },

    'click #addCrmTaskNumber, keypress #crmTaskNumber': function(event) {
        // if this is a keypress event make sure the key is return
        if (event.type === 'keypress' && event.which !== 13) { return; }

        var taskNumber = $('#crmTaskNumber').val();
        var crmNumbers = Session.get('crmNumbers') || [];

        var message = false;
        if (taskNumber === null || taskNumber === '') {
            message = 'Please enter a task number';
        } else if (!$.isNumeric(taskNumber)) {
            message = 'A task number must be an integer';
        } else if ($.inArray(taskNumber, crmNumbers) !== -1) {
            message = 'You can\'t list the same task number twice';
        }

        if (message !== false) {
            var validationAlert = Session.get('validationAlert');
            sAlert.close(validationAlert);
            return Session.set('validationAlert', sAlert.error(message));
        }

        crmNumbers.push(taskNumber);

        Session.set('crmNumbers', crmNumbers);

        $('#crmTaskNumber').val('');

        $('#crmNumbers').html(crmNumbers.join(', '));
    }
});
