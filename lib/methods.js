Meteor.methods({
    addBranch: function (branch) {
        validateBranch(branch);
        BranchList.insert(branch);
    },

    updateBranch: function (branchId, newValues) {
        // get the status of the branch - on server so we can trust the result
        newValues.status = getBranchStatus(newValues);
        validateBranch(newValues);
        BranchList.update({_id: branchId}, {$set: newValues});
    }
});
