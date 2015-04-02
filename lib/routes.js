Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', function () {
    this.render('list');
});

Router.route('/addBranch', function () {
    this.render('addBranch');
});
