Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', function () {
    this.render('list');
});

Router.route('/addBranch', function () {
    this.render('addBranch');
});

Router.route('/editBranch/:_id', {
    name: 'editBranch',
    data: function () {
        return BranchList.findOne(this.params._id);
    }
});

Router.onBeforeAction(function () {
    topbar.show();
    this.next();
});

Router.onAfterAction(function () {
    topbar.hide();
});
