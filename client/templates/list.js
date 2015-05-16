Template.list.helpers({
    branches: function () {
        Session.setDefault('filter', 'all');

        var filter = Session.get('filter');
        var query;

        if (filter === 'all') {
            return BranchList.find({}, {sort: {createdOn: -1}});
        }

        return BranchList.find({status: {$in: [filter]}}, {sort: {createdOn: -1}});
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    },

    'change #filterBranches': function () {
        Session.set('filter', $('#filterBranches').val());
    }
});
