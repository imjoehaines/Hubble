# Hubble
The dev bubble


```js

var branch = {
    id: 124536,
    startDate: new Date(2015, 04, 02),
    type: 'support',
    crmTaskNumbers: [
        12536,
    ],
    name: 'Hubble!',
    description: 'blah blah blah',
    team: 'ipalphafan',
    state: 'CREATED',
    contributors: [

    ],
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
        reviewers: [

        ],
    },
    isPassingOnCI: false,
    mergeInfo: {
        sucessfulMergeFromMaster: false,
        mergedToMaster: false,
        masterCommitId: null
    },
    isDeployed: false,
    isDeprecated: false
}

var states = {
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

```

