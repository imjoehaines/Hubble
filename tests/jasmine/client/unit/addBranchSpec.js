describe('addBranch.js', function() {
    beforeEach(function() {
        // reset session variable between each test
        Session.set('crmNumbers', undefined);
    });

    describe('hasCrmTaskNumbers', function() {
        // use toBe(false) instead of toBeFalsy() for strict checking (=== vs ==)

        it('should return false when no session is set', function() {
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when an int is set', function() {
            Session.set('crmNumbers', 12);
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when a string is set', function() {
            Session.set('crmNumbers', 'squiddly');
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when an object is set', function() {
            Session.set('crmNumbers', {'1': '2'});
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when an empty array is set', function() {
            Session.set('crmNumbers', []);
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(false);
        });

        it('should return true when a non-empty array is set', function() {
            Session.set('crmNumbers', [1]);
            expect(Template.addBranch.__helpers[' hasCrmTaskNumbers']()).toBe(true);
        });
    });

    describe('getCrmTaskNumbers', function() {
        it('should return false when no session is set', function() {
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when an int is set', function() {
            Session.set('crmNumbers', 12);
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when a string is set', function() {
            Session.set('crmNumbers', 'beep');
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe(false);
        });

        it('should return false when an object is set', function() {
            Session.set('crmNumbers', {'a': 'b'});
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe(false);
        });

        it('should return an empty string when an empty array is set', function() {
            Session.set('crmNumbers', []);
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe('');
        });

        it('should return correct value with one element', function() {
            Session.set('crmNumbers', [1]);
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe('1');
        });

        it('should return correct values with multiple elements', function() {
            Session.set('crmNumbers', [1, 2, 3, 10, 100, 999]);
            expect(Template.addBranch.__helpers[' getCrmTaskNumbers']()).toBe('1, 2, 3, 10, 100, 999');
        });
    });

    describe('created', function() {
        it('should set session variable to null', function() {
            expect(Session.get('crmNumbers')).toBe(undefined);
            Template.addBranch.created();
            expect(Session.get('crmNumbers')).toBe(null);
        });
    });

});
