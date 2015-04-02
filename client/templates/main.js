Template.registerHelper("prettifyDate", function(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 10);
});

Template.registerHelper("getStatusName", function(status) {
    var statuses = {
        created: 'Created',
        inProgress: 'In Progress',
        readyForReview: 'Ready for Review',
        inReview: 'In Review',
        prepareForMaster: 'Prepare for Master',
        readyForMaster: 'Ready for Master',
        mergedToMaster: 'Merged to Master',
        deployed: 'Deployed',
        deprecated: 'Deprecated'
    };

    return statuses[status];
});

Template.registerHelper("getBranchCurrentStatus", function(branch) {
    if (branch.isDeprecated) {
        return 'deprecated';
    } else if (branch.contributors.length === 0) {
        return 'created';
    } else {
        if (branch.tests.acceptance.done !== false &&
            branch.tests.unit.done !== false &&
            branch.tests.browser.done !== false &&
            branch.isPassingOnCI &&
            branch.review.ready) {
            if (branch.review.reviewers.length > 0) {
                if (branch.review.passed) {
                    if (branch.mergeInfo.sucessfulMergeFromMaster) {
                        if (branch.mergeInfo.mergedToMaster && branch.mergeInfo.masterCommitId != null) {
                            if (branch.isDeployed) {
                                return 'deployed';
                            }
                            return 'mergedToMaster';
                        }
                        return 'readyForMaster';
                    }
                    return 'prepareForMaster';
                }
                return 'inReview';
            }
            return 'readyForReview';
        }
        return 'inProgress';
    }
});
