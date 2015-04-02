Template.viewBranch.events({
    'click #updateBranch': function () {
        var type = $('#type').val();
        var crmTaskNumber = Session.get('crmNumbers');
        var name = $('#name').val();
        var sprints = $('#sprints').val();
        var description = $('#description').val();
        var team = $('#team').val();

        if (!type || !crmTaskNumber || !name || !sprints || !description || !team) {
            return;
        }


        var status;

        if (branch.isDeprecated) {
            status = 'deprecated';
        } else if (branch.contributors.length === 0) {
            status = 'created';
        } else {
            if (branch.tests.acceptance.done !== false &&
                branch.tests.unit.done !== false &&
                branch.tests.browser.done !== false &&
                branch.isPassingOnCI &&
                branch.review.ready) {
                if (branch.review.reviewers.length > 0) {
                    if (branch.review.passed) {
                        if (branch.mergeInfo.sucessfulMergeFromMaster) {
                            if (branch.mergeInfo.mergedToMaster && branch.mergeInfo.masterCommitId !== null) {
                                if (branch.isDeployed) {
                                    status = 'deployed';
                                }
                                status = 'mergedToMaster';
                            }
                            status = 'readyForMaster';
                        }
                        status = 'prepareForMaster';
                    }
                    status = 'inReview';
                }
                status = 'readyForReview';
            }
            status = 'inProgress';
        }

        BranchList.update(
            {
                _id: this._id
            }, {
                type: type,
                crmTaskNumber: crmTaskNumber,
                name: name,
                sprints: sprints,
                description: description,
                team: team,
                status: status
            }
        );

        type = $('#type').val('');
        Session.set('crmNumbers', undefined);
        name = $('#name').val('');
        sprints = $('#sprints').val('');
        description = $('#description').val('');
        team = $('#team').val('');
    },

    'click #addCrmTaskNumber': function() {
        var taskNumber = $('#crmTaskNumber').val();
        var crmNumbers = Session.get('crmNumbers') || [];

        if (taskNumber === null || taskNumber === '' ||
            $.inArray(taskNumber, crmNumbers) !== -1 || !$.isNumeric(taskNumber)) {
            return;
        }

        crmNumbers.push(taskNumber);

        Session.set('crmNumbers', crmNumbers);

        $('#crmTaskNumber').val('');

        $('#crmNumbers').html(crmNumbers.join(', '));
    }

});
