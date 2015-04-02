Template.list.helpers({
    counter: function () {
        return Session.get('counter');
    },
    branches: function () {
        return [
            {
                name: 'Hubble',
                teams: [
                    {name:'AstroFan'},{name:'IPAs'},{name:'AlphaTeam'}
                ],
                startDate: '2015-04-02',
                sprint: 49,
                status: 'Created'
            },
            {
                name: 'Hubble',
                teams: [
                    {name:'AstroFan'},{name:'IPAs'},{name:'AlphaTeam'}
                ],
                startDate: '2015-04-02',
                sprint: 49,
                status: 'Created'
            }
        ];
    }
});

Template.list.events({
    'click .addBranch': function () {
        Router.go('addBranch');
    }
});