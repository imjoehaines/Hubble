Template.addBranch.events({
    'click #addNewBranch': function () {
        var branch;
        try {
            branch = getMainBranchFields();
        } catch (error) {
            return sAlert.error(error.message);
        }

        branch.status = 'created';

        Meteor.call('addBranch', branch, function (error) {
            if (error) {
                return sAlert.error(getErrorMessage(error));
            }

            Session.set('branchSuccess', { name: branch.name, type: 'created' });

            // redirect to home page
            Router.go('/');
        });
    }
});

