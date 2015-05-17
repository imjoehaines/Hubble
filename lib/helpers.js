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
                done: Boolean,
                testers: [String]
            },
            unit: {
                done: Boolean,
                testers: [String]
            },
            browser: {
                done: Boolean,
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