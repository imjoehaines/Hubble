BranchList = new Mongo.Collection('branchlist');

BranchList.before.insert(function (userId, branch) {
    branch.createdOn = new Date();
    // branch.createdBy = userId;
});

BranchList.before.update(function (userId, brach, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.lastModifiedOn = new Date();
    // modifier.$set.lastModifiedBy = userId;
});
