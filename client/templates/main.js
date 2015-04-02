Template.registerHelper("prettifyDate", function(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-GB');
});
