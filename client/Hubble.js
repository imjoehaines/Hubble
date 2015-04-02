Template.list.helpers({
    counter: function () {
        return Session.get('counter');
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    }
});