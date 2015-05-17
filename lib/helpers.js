validateBranch = function (branch) {
    check(branch, {
        type: Match.OneOf('Support', 'Sprint'),
        crmTaskNumber: [String],
        name: String,
        sprints: Match.OneOf([Number], Number),
        description: String,
        team: Match.OneOf('Alpha Team', 'Astro Fan', 'IPAs and APIs'),
        createdOn: Match.Optional(Date),
        status: Match.OneOf('deprecated', 'created', 'deployed', 'mergedToMaster',
            'readyForMaster', 'prepareForMaster', 'inReview', 'readyForReview', 'inProgress'),
        contributors: Match.Optional(String),
        tests: Match.Optional({
            acceptance: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            },
            unit: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            },
            browser: {
                done: Match.OneOf(Boolean, null),
                testers: [String]
            }
        }),
        review: Match.Optional({
            ready: Match.Optional(Boolean),
            passed: Match.Optional(Boolean),
            reviewers: Match.Optional([String]),
        }),
        isPassingOnCI: Match.Optional(Boolean),
        mergeInfo: Match.Optional({
            sucessfulMergeFromMaster: Match.Optional(Boolean),
            mergedToMaster: Match.Optional(Boolean),
            masterCommitId: Match.Optional(String)
        }),
        isDeployed: Match.Optional(Boolean),
        isDeprecated: Match.Optional(Boolean)
    });
};

getBranchStatus = function (branch) {
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
                        if (branch.mergeInfo.mergedToMaster && branch.mergeInfo.masterCommitId !== null) {
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
};
