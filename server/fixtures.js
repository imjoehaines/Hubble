if (BranchList.find().count() === 0) {
    BranchList.insert({
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprint: 49,
        status: 'Created',
        statusSelector: 'created',
        crmTaskNumbers: [123, 456, 789],
        description: 'blah blah blah',
        contributors: [],
        tests: {
            acceptance: {
                done: false,
                testers: []
            },
            unit: {
                done: false,
                testers: []
            },
            browser: {
                done: false,
                testers: []
            }
        },
        review: {
            ready: false,
            passed: false,
            reviewers: [],
        },
        isPassingOnCI: false,
        mergeInfo: {
            sucessfulMergeFromMaster: false,
            mergedToMaster: false,
            masterCommitId: null
        },
        isDeployed: false,
        isDeprecated: false
    });
    BranchList.insert({
        name: 'Hooble',
        team: 'Astro Fan',
        createdOn: new Date(),
        sprint: 49,
        status: 'Created',
        statusSelector: 'created',
        crmTaskNumbers: [123, 456, 789],
        description: 'blah blah blah',
        contributors: [],
        tests: {
            acceptance: {
                done: false,
                testers: []
            },
            unit: {
                done: false,
                testers: []
            },
            browser: {
                done: false,
                testers: []
            }
        },
        review: {
            ready: false,
            passed: false,
            reviewers: [],
        },
        isPassingOnCI: false,
        mergeInfo: {
            sucessfulMergeFromMaster: false,
            mergedToMaster: false,
            masterCommitId: null
        },
        isDeployed: false,
        isDeprecated: false
    });
}