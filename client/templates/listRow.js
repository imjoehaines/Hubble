Template.listRow.helpers({
    formatSprintArray: function (sprints) {
        // join with a comma then replace the last comma with an ampersand
        return sprints.join(', ').replace(/, ([0-9]+)$/, ' & $1');
    }
});
