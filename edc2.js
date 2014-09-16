var edc = {
    in_date: "",
    probation: "",
    elect_date: "",
    plan: "",
    type: "",
    days: "",
    first_eligible: "",
    last_eligible: "",
    sep_type: "",
    "getFirstEligible": function() {
        if(this.type == "New Hire") {
            this.first_eligible = moment(this.in_date).add(this.probation, 'days');
        } else {
            this.first_eligible = moment(this.in_date);
        }
        first = moment(this.first_eligible).toDate();
        console.log("first eligible = " + first);
        return first;
    },
    "getLastEligible": function() {
        switch(this.type) {
            case "New Hire":
                this.days = 30;
                break;
            case "Special Enrollment Period":
                switch(this.sep_type) {
                    case "Relocation":
                        this.days = 30;
                        break;
                    case "Birth":
                        this.days = 30;
                        break;
                    case "Loss of MEC":
                        this.days = 30;
                        break;
                    case "Loss of Medicade":
                        this.days = 60;
                        break;
                    case "Marriage":
                        this.days = 30;
                        break;
                }
        }
        this.last_eligible = moment(this.first_eligible).add(this.days, 'days');
        last = moment(this.last_eligible).toDate();
        console.log("last eligible = " + last);
        return last;
    },
    "getDateRange": function() {
        var first = this.getFirstEligible();
        console.log(first);
        var last = this.getLastEligible();
        console.log(last);
        var range = {
            minDate: first,
            maxDate: last
        };
        return range;
    },
    // setters
    "setInDate": function(date) {
        this.in_date = date;
    },
    "setProbation": function(date) {
        this.probation = date;
    },
    "setElection": function(date) {
        this.elect_date = date;
    },
    "setSepType": function(sep) {
        this.sep_type = sep;
    },
    //calculations
    "calculate": function() {
        switch(this.plan) {
            case "Small Group":
                switch(this.type) {
                    case "New Hire":
                        var eff = this.calcGeneric();
                        return eff;
                        break;
                    case "Special Enrollment Period":
                        var eff = this.calcSmallGroupSpecial();
                        return eff;
                        break;
                }
                //case "Individual"  
        }
    },
    // end calculate
    // functions
    "calcGeneric": function() {
        //calculate new hire date
        var due = moment().date(15);
        console.log("due = " + due);
        if(moment(this.elect_date).date() < moment(due).date()) {
            var nextMonth = moment(this.elect_date).add('months', 1);
            var effective = moment(nextMonth).date(1).format('MM DD YYYY');
            return effective;
        } else {
            var nextMonth = moment(this.elect_date).add('months', 2);
            var effective = moment(nextMonth).date(1).format('MM DD YYYY');
            return effective;
        }
    },
    "calcMedicade": function() {
        var due = moment(this.elect_date).date(15);
        if(moment(this.elect_date).date() < moment(due).date()) {
            var nextMonth = moment(this.elect_date).add('months', 1);
            var effective = moment(nextMonth).date(1).format('MM DD YYYY');
            console.log("1 = " + effective);
            return effective;
        } else if(moment(this.elect_date).date() > moment(due).date() && moment(this.elect_date).date() < moment(due).add('months', 1)) {
              var nextMonth = moment(this.elect_date).add('months', 2);
              var effective = moment(nextMonth).date(1).format('MM DD YYYY');
              console.log("2 = " + effective);
              return effective;
    } else {
        var nextMonth = moment(this.elect_date).add('months', 3);
        var effective = moment(nextMonth).date(1).format('MM DD YYYY');
        console.log("3 = " + effective);
        return effective;
    }
}, "calcSmallGroupSpecial": function() {
        //calculate special date
        switch(this.sep_type) {
            case "Loss of MEC":
            case "Loss of CHIP":
            case "Marriage":
            case "Relocation":
                var eff = this.calcGeneric();
                return eff;
                break;
            case "Birth":
                var eff = this.in_date;
                return eff;
                break;
            case "Loss of Medicade":
                var eff = this.calcMedicade();
                return eff;
                break;
        }
    },
    }