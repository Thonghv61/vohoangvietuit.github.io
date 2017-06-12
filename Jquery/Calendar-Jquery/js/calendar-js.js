window.onload = function() {
    var input = $("#datepicker");
    var d = new Date();
    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var month = d.getMonth(); //lấy tháng hiện tại
    var year = d.getFullYear(); //lấy năm hiện tại

    $("#datepicker").click(function(){
        show();
    });

    //HÀM HIỂN THỊ CALENDAR
    function show() {
        //bỏ sự kiện click
        $("#datepicker").off('click');
        var first_date = month_name[month] + " " + 1 + " " + year;
        //September 1 2014
        var tmp = new Date(first_date).toDateString();
        //Mon Sep 01 2014 ...
        var first_day = tmp.substring(0, 3); //Mon

        var day_no = day_name.indexOf(first_day); //1
        var days = new Date(year, month + 1, 0).getDate(); //30
        //Tue Sep 30 2014 ...
        var calendar = get_calendar(day_no, days);

        var $div = $("<div>", {id: "calendar", "class": "calendar-container"});
        $div.click(function(){ /* ... */ });
        $div.append(calendar);

        //in lịch dưới input
        $div.insertAfter(input);
    }

    //HÀM IN RA BẢNG CHO CALENDAR
    function get_calendar(day_no, days) {

        var $table = $("<table>");
        var $tr = $("<tr>");

        //nút prev year 
        var $td = $("<td>");
        var $prevY = $("<button>");

        $prevY.html("<<");
        $prevY.click(function() {
            if (year > 1950) {
                year--;
                $table.parent().remove();
                show();
            }

        });
        $td.append($prevY);
        $tr.append($td);

        //nút pre month
        $td = $("<td>");
        var $prevM = $("<button>");
        $prevM.html("<");
        $prevM.click(function() {
            if (month > 0) {
                month--;
                $table.parent().remove();
                show();
            }

        });
        $td.append($prevM);
        $tr.append($td);

        //chọn tháng năm
        //chọn tháng
        $td = $("<td>");
        $listMonth = $("<select>");
        $listMonth.change(function() {
            month = this.options[this.selectedIndex].value;
            console.log(this.options[this.selectedIndex].value);

            $table.parent().remove();
            show();
            //listMonth.options[listMonth.selectedIndex].text = month_name[month];        
        });

        //chọn năm
        $listYear = $("<select>");
        $listYear.change(function() {
            year = this.options[this.selectedIndex].value;
            console.log(this.options[this.selectedIndex].value);

            $table.parent().remove();
            show();
        });

        //option tháng
        for (var i = 0; i <= 11; i++) {
            $option = $("<option>");
            //var option = document.createElement('option');
            $option.val(i);
            $option.text(month_name[i]);
            if (i == month) {
                $option.prop("selected", true);
            }
            $listMonth.append($option);
        }

        //option năm
        for (var j = 1950; j <= d.getFullYear(); j++) {
            $option = $("<option>");
            $option.val(j);
            $option.text(j);
            if (j == year) {
                $option.prop("selected", true);
            }
            $listYear.append($option);
        }
        $td.append($listMonth);
        $td.append($listYear);
        $td.attr("colspan", "3");
        $tr.append($td);

        //nút next month
        $td = $("<td>");
        var $nextM = $("<button>");
        $nextM.text(">");
        $nextM.click(function() {
            if (month < 11) {
                month++;
                $table.parent().remove();
                show();
            }

        });
        $td.append($nextM);
        $tr.append($td);
        $table.append($tr);

        //nút prev year 
        $td = $("<td>");
        var $nextY = $("<button>");
        $nextY.text(">>");
        $nextY.click(function() {
            if (year < d.getFullYear()) {
                year++;
                $table.parent().remove();
                show();
            }

        });
        $td.append($nextY);
        $tr.append($td);

        //IN THỨ
        $tr = $("<tr>");
        for (var week_day = 0; week_day <= 6; week_day++) {
            $td = $("<td>", {"class":"week"});
            $td.html(day_name[week_day]);
            $tr.append($td);
        }
        $table.append($tr);

        //IN NGÀY TRỐNG TRONG THÁNG
        $tr = $("<tr>");
        var c;
        for (c = 0; c <= 6; c++) {
            if (c == day_no) {
                break;
            }
            $td = $("<td>");
            $td.empty();
            $tr.append($td);
        }

        //BẮT ĐẦU IN NGÀY TRONG THÁNG
        var count = 1;
        for (; c <= 6; c++) {
            $td = $("<td>", {"class":"days"});
            if (count == d.getDate() && month == d.getMonth && year == d.getFullYear()) {
                $td.css({
                    "background": "aqua"
                });
            }
            $td.html(count);
            $td.click(function(e){
                choseDate(e); //sự kiện chọn ngày
            });
            count++;
            $tr.append($td);
        }
        $table.append($tr);
        for (var r = 3; r <= 7; r++) {
            $tr = $("<tr>");
            for (var c = 0; c <= 6; c++) {
                if (count > days) {
                    $table.append($tr);
                    return $table;
                }
                $td = $("<td>", {"class":"days"});
                if (count == d.getDate() && month == d.getMonth() && year == d.getFullYear()) {
                    $td.css({
                        "background": "aqua"
                    });
                }
                $td.html(count);
                $td.click(function(e){
                    choseDate(e); //sự kiện chọn ngày
                });
                count++;
                $tr.append($td);
            }
            $table.append($tr);
        }
        //KẾT THÚC IN NGÀY
        return $table;
    }

    //HÀM TRUYỀN NGÀY CHỌN VÀO INPUT
    function choseDate(e) {
        var day = $(e.target).text();
        //alert(day);
        var div = $(e.target).closest(".calendar-container");

        var date = day + "/" + (parseInt(month) + 1) + "/" + year;
        input.val(date);
        div.remove();
        //input.addEventListener("click", show);
        $("#datepicker").click(function(){
            show();
        });
    }
};