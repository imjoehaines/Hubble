/**
 * Unit tests for /lib/helpers.js
 */
describe('helpers.js', function () {
    describe('getBranchStatus', function() {
        var basicBranch;
        beforeEach(function () {
            basicBranch = {
                isDeprecated: false,
                contributors: ['bob'],
                tests: {
                    acceptance: { done: true },
                    unit: { done: true },
                    browser: { done: true }
                }
            };
        });

        it('should return deprecated for deprecated branches', function() {
            expect(getBranchStatus({isDeprecated: true})).toBe('deprecated');
        });

        it('should return created when there are no contributors', function() {
            expect(getBranchStatus({contributors: []})).toBe('created');
        });

        it('should return inProgress when a branch is untested', function() {
            expect(getBranchStatus(basicBranch)).toBe('inProgress');
        });

        it('should return readyForReview when a branch is ready for review', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: [] }
            });

            expect(getBranchStatus(branch)).toBe('readyForReview');
        });

        it('should return inReview when a branch is being reviewed', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: ['martha'] }
            });

            expect(getBranchStatus(branch)).toBe('inReview');
        });

        it('should return prepareForMaster when a branch is being prepared for master', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: ['martha'], passed: true },
                mergeInfo: { sucessfulMergeFromMaster: false }
            });

            expect(getBranchStatus(branch)).toBe('prepareForMaster');
        });

        it('should return readyForMaster when a branch is ready for master', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: ['martha'], passed: true },
                mergeInfo: { sucessfulMergeFromMaster: true }
            });

            expect(getBranchStatus(branch)).toBe('readyForMaster');
        });

        it('should return mergedToMaster when a branch is ready for master', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: ['martha'], passed: true },
                mergeInfo: { sucessfulMergeFromMaster: true, mergedToMaster: true, masterCommitId: 6 }
            });

            expect(getBranchStatus(branch)).toBe('mergedToMaster');
        });

        it('should return deployed when a branch is deployed', function() {
            var branch = _.extend(basicBranch, {
                isPassingOnCI: true,
                review: { ready: true, reviewers: ['martha'], passed: true },
                mergeInfo: { sucessfulMergeFromMaster: true, mergedToMaster: true, masterCommitId: 6 },
                isDeployed: true
            });

            expect(getBranchStatus(branch)).toBe('deployed');
        });
    });

    describe('validateBranch', function() {
        it('should throw an error when a branch is wrong', function() {
            expect(function () {
                validateBranch({});
            }).toThrow();
        });

        it('should\'t cate about optional fields', function() {
            expect(function () {
                validateBranch({
                    type: 'Support',
                    crmTaskNumber: [123],
                    name: 'bob\'s big branch',
                    sprints: 12,
                    description: 'bob made a branch that was big',
                    team: 'Alpha Team',
                    status: 'created'
                });
            }).not.toThrow();
        });
    });

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
