$(function() {


    
    $("#DDplan").dialog({
        autoOpen:true,
        height:275,
        width:400,
        modal:true,
        title:"Plan Select",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                edc.plan = $("#selectPlan").val();
                console.log(edc.plan);
                if(edc.plan == "Small Group"){
                    setup("#DDplan", "#small_group");
                } else {
                    //setup individual
                }
              
            }
        }
        
    });
    $("#small_group").dialog({
        autoOpen:false,
        height:275,
        width:400,
        modal:true,
        title:"Group Type",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                edc.type = $("#DDsmall_group_type").val();
                console.log(edc.type);
                switch(edc.type){
                    case "New Hire":
                        setup("#small_group", "#new_hire");
                        break;
                    case "Special Enrollment Period":
                        setup("#small_group", "#sep");
                        break;
        		}
            }
        }
    });
    
    $("#new_hire").dialog({
        autoOpen:false,
        height:375,
        width:400,
        modal:true,
        title:"New Hire Info",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                edc.setInDate($("#DPin_date").val());
                edc.setProbation(parseInt($("#Probation").val()));
        		console.log("Probation = " + edc.probation);
                var range = edc.getDateRange();
        		console.log("returned = " + range);
        		initSelect(range);
                setup("#new_hire", "#planSelect");
            }
        }        
    })
    
    $("#effective").dialog({
        autoOpen:false,
        height:275,
        width:400,
        modal:true,
        title:"Effective Date",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                $(this).dialog("destroy");
            }
        }
        
    })
    
    $("#sep").dialog({
        autoOpen:false,
        height:275,
        width:400,
        modal:true,
        title:"Special Enrollment Type",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                edc.setSepType($("#DDsep").val());
                setup("#sep", "#sepInfo");
            }
        }
    })
    
    $("#sepInfo").dialog({
        autoOpen:false,
        height:275,
        width:400,
        modal:true,
        title:"Special Enrollment Info",
        show:{effect:"slide",direction:"up",duration:200},
        hide:{effect:"slide",direction:"down",duration:200},
        buttons:{
            "Ok": function(){
                edc.setInDate($("#DPevent_date").val());
                console.log("Event Date = " + edc.in_date);
                var range = edc.getDateRange();
                console.log("returned = " + range);
                initSelect(range);
                setup("#sepInfo", "#planSelect");
            }
        }
    })
    
    $("#DPin_date").datepicker().on('change', function(e) {
        edc.setInDate($(this).val());
        console.log("Hire date = " + edc.in_date);
    });
    // special enrollment listeners
    $("#calc").click(function() {
        var effective = edc.calculate();
        $("#effectivedate").text(moment(effective).format('MMM DD YYYY'));
    });

    
    $("#planSelect").dialog({
                autoOpen:false,
                height:275,
                width:400,
                modal:true,
                title:"Date of Plan Selection",
                show:{effect:"slide",direction:"up",duration:200},
                hide:{effect:"slide",direction:"down",duration:200},
                buttons:{
                    "Calculate": function(){
                        edc.elect_date = $("#DPplan_selection").val();
                        var effective = edc.calculate();
                        $("#effectivedate").text(effective);
                        setup("#planSelect", "#effective", effective);
                    }
                }
            })
    
    
    function initSelect(range){
        $("#plan_selection").datepicker(range);
        }
    
    function setup(destroy, build, eff = ""){
        $(destroy).dialog("destroy");
        $(build).dialog("open");
    }
    
})