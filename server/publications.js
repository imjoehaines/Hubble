Meteor.publish('branchlist', function () {
    return BranchList.find({});
});
