Template.registerHelper('prettifyDate', function (timestamp) {
    // if the year matches the current year then ommit it
    var dateFormat = moment(timestamp).isSame(moment(), 'year') && 'MMMM Do' || 'MMMM Do YYYY';
    return moment(timestamp).format(dateFormat);
});

Template.registerHelper('getStatusName', function (status) {
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

Template.registerHelper('joinArrayWithComma', function (array) {
    return array.join(', ');
});

Meteor.startup(function () {
    sAlert.config({
        effect: 'jelly',
        position: 'top-right',
        timeout: 5000,
        html: false
    });
});
