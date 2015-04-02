Template.registerHelper("prettifyDate", function(timestamp) {
    return new Date(timestamp).toISOString().slice(0, 10);
});
