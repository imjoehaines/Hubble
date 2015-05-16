# Hubble [![Codacy Badge](https://www.codacy.com/project/badge/04aba743e40b43e18be8d45e7b4a254a)](https://www.codacy.com/app/joehaines/Hubble)
The dev bubble


```js

var branch = {
    id: 124536,
    startDate: new Date(2015, 04, 02),
    type: 'support',
    sprints: [
        49,
        50
    ],
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

