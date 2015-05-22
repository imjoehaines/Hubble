Template.registerHelper('prettifyDate', function (timestamp) {
    // moment doesn't allow us to get only the ordinal so we have to do this :(
    var date = moment(timestamp).format('MMMM Do');
    var ordinal = date.slice(-2);
    return date.slice(0, -2) + '<sup>' + ordinal + '</sup>';
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
    return $.isArray(array) && array.join(', ');
});

Meteor.startup(function () {
    sAlert.config({
        effect: 'jelly',
        position: 'top-right',
        timeout: 5000,
        html: false
    });
});
