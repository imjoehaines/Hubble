Template.list.helpers({
    branches: function () {
        Session.setDefault('filter', 'all');

        var filter = Session.get('filter');

        if (filter === 'all') {
            return BranchList.find({}, {sort: {createdOn: -1}});
        }

        return BranchList.find({status: {$in: filter}}, {sort: {createdOn: -1}});
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

Template.list.rendered = function () {
    $(function() {
        $('#filterBranches').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            selectAllNumber: false,
            numberDisplayed: 1
        });
    });
};
