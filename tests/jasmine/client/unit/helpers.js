describe('helpers.js', function () {
    describe('getBooleanFromString', function () {
        it('should return true when passed "true"', function () {
            expect(getBooleanFromString('true')).toBe(true);
        });

        it('should return false when passed "false"', function () {
            expect(getBooleanFromString('false')).toBe(false);
        });

        it('should return null when passed anything else', function () {
            expect(getBooleanFromString('something')).toBe(null);
        });
        it('shouldn\'t care about whitespace before/after the string', function () {
            expect(getBooleanFromString(' true')).toBe(true);
            expect(getBooleanFromString(' true ')).toBe(true);
            expect(getBooleanFromString('false ')).toBe(false);
        });
    });

    describe('getErrorMessage', function () {
        it('should return a validation error when a match has failed', function () {
            expect(getErrorMessage({reason: 'Match failed'})).toContain('Validation failed');
        });

        it('should return an unexpected error when there is a different reason', function () {
            expect(getErrorMessage({reason: 'you broke it'})).toContain('An unexpected error occured');
        });

        it('should return an unexpected error when there isn\'t a reason', function () {
            expect(getErrorMessage({noReason: 'was an ok song'})).toContain('An unexpected error occured');
        });

        it('should return an unexpected error when not passed an object', function () {
            expect(getErrorMessage(['beep', 'boop'])).toContain('An unexpected error occured');
        });
    });

    describe('getMainBranchFields', function () {
        beforeEach(function () {
            $('<input>').attr('id', 'type').appendTo('body');
            $('<input>').attr('id', 'name').appendTo('body');
            $('<input>').attr('id', 'crmTaskNumber').appendTo('body');
            $('<input>').attr('id', 'sprints').appendTo('body');
            $('<input>').attr('id', 'description').appendTo('body');
            $('<input>').attr('id', 'team').appendTo('body');
        });

        it('should throw an error when nothing is filled in', function () {
            expect(function () {
                getMainBranchFields();
            }).toThrow();
        });

        describe('with filled in fields', function () {
            var fields;

            beforeEach(function () {
                fields = [$('#type'), $('#name'), $('#crmTaskNumber'), $('#sprints'), $('#description'), $('#team')];

                // fill in all the fields with correct data
                $('#type').val('Sprint');
                $('#name').val('something');
                $('#crmTaskNumber').val('1, 2, 3');
                $('#sprints').val('4, 5, 6');
                $('#description').val('something');
                $('#team').val('Alpha Team');
            });

            it('should throw an error when some fields are missing', function () {
                var previousValue = '';
                $.each(fields, function (index) {
                    $(this).val('');

                    expect(function () {
                        getMainBranchFields();
                    }).toThrow();
                });
            });

            it('should work perfectly when all fields are filled in correctly', function () {
                expect(getMainBranchFields()).toEqual({
                    type: 'Sprint',
                    crmTaskNumber: [1, 2, 3],
                    name: 'something',
                    sprints: [4, 5, 6],
                    description: 'something',
                    team: 'Alpha Team'
                });
            });
        });
    });
});
