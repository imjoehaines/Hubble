// BranchList.remove({});

if (BranchList.find().count() === 1) {
    BranchList.insert({
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'created',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'inProgress',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'readyForReview',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'inReview',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'prepareForMaster',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'readyForMaster',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'mergedToMaster',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'deployed',
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
        name: 'Hubble',
        team: 'AlphaTeam',
        createdOn: new Date(),
        sprints: 49,
        status: 'deprecated',
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
        sprints: 49,
        status: 'created',
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