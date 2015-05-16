Template.registerHelper('prettifyDate', function(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 10);
});

Template.registerHelper('getStatusName', function(status) {
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
