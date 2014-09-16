$(function() {
    $("#DDplan").on('change', function(e) {
        edc.plan = $(this).val();
        console.log(edc.plan);
    });
    $("#DDsmall_group_type").on('change', function(e) {
        edc.type = $(this).val();
        console.log(edc.type);
        switch(edc.type) {
            case "New Hire":
                $("#new_hire").css('visibility', 'visible');
                $("#sep").css('visibility', 'hidden');
                break;
            case "Special Enrollment Period":
                $("#new_hire").css('visibility', 'hidden');
                $("#sep").css('visibility', 'visible');
                break;
            case "":
                $("#new_hire").css('visibility', 'hidden');
                break;
        }
    });
    $("#Probation").on('change', function(e) {
        edc.setProbation(parseInt($(this).val()));
        console.log("Probation = " + edc.probation);
    });
    $("#DPin_date").datepicker().on('change', function(e) {
        edc.setInDate($(this).val());
        console.log("Hire date = " + edc.in_date);
    });
    // special enrollment listeners
    $("#DDsep").on('change', function(e) {
        edc.setSepType($(this).val());
        $("#sepInfo").css('visibility', 'visible');
    });
    $("#DPevent_date").datepicker().on('change', function(e) {
        edc.setInDate($(this).val());
        $("#planSelect").css('visibility', 'visible');
        console.log("Event Date = " + edc.in_date);
        var range = edc.getDateRange();
        console.log("returned = " + range);
        initSelect(range);
    });
    $("#ok").click(function() {
        $("#planSelect").css('visibility', 'visible');
        var range = edc.getDateRange();
        console.log("returned = " + range);
        initSelect(range);
    });
    $("#calc").click(function() {
        var effective = edc.calculate();
        $("#effectivedate").text(moment(effective).format('MMM DD YYYY'));
    });

    function initSelect(range) {
        $("#DPplan_selection").datepicker(range).on('change', function(e) {
            edc.elect_date = $(this).val();
            console.log("Elected date = " + edc.elect_date);
        });
    }
})