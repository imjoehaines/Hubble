Template.list.helpers({
    branches: function () {
        return BranchList.find();
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    }
});