Template.list.helpers({
    branches: function () {
        return BranchList.find({}, {sort: {createdOn: -1}});
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    }
});