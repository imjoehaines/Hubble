Template.list.helpers({
    branches: function () {
        Session.setDefault('filter', 'default');
        Session.setDefault('sort', 'createdOn');
        Session.setDefault('sortDirection', -1);

        var filter = Session.get('filter');
        var sortField = Session.get('sort');
        var sortDirection = Session.get('sortDirection');

        var sortOptions = {};
        sortOptions[sortField] = sortDirection;

        // default to show all non-deployed & non-deprecated branches
        if (filter === 'default') {
            return BranchList.find({status: {$nin: ['deployed', 'deprecated']}}, {sort: sortOptions});
        }

        return BranchList.find({status: {$in: filter}}, {sort: sortOptions});
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    },

    'change #filterBranches': function () {
        Session.set('filter', $('#filterBranches').val());
    },

    'change #sortBranches': function () {
        Session.set('sort', $('#sortBranches').val());
    },

    'change #sortDirection': function () {
        Session.set('sortDirection', parseInt($('#sortDirection').val()));
    }
});

Template.list.rendered = function () {
    $(function () {
        $('#filterBranches').multiselect({
            includeSelectAllOption: true,
            selectAllNumber: false,
            numberDisplayed: 1,
            nonSelectedText: 'None',
            allSelectedText: 'All'
        });

        $('#sortBranches').multiselect();
        $('#sortDirection').multiselect();

        // show a success message when a branch gets made or updated
        var success = Session.get('branchSuccess');
        if (success) {
            // Successfully created "a branch" || Successfully updated "a branch"
            var message = 'Successfully ' + success.type + ' "' + success.name + '"';
            sAlert.success(message);
            Session.set('branchSuccess', null);
        }
    });
};
