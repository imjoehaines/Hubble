Template.list.helpers({
    branches: function () {
        Session.setDefault('filter', 'all');
        Session.setDefault('sort', 'createdOn');
        Session.setDefault('sortDirection', -1);

        var filter = Session.get('filter');
        var sortField = Session.get('sort');
        var sortDirection = Session.get('sortDirection');

        sortOptions = {};
        sortOptions[sortField] = sortDirection;

        if (filter === 'all') {
            return BranchList.find({}, {sort: sortOptions});
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
    $(function() {
        $('#filterBranches').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            selectAllNumber: false,
            numberDisplayed: 1
        });

        $('#sortBranches').multiselect();
        $('#sortDirection').multiselect();
    });
};
