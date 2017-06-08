window.onload = function() {
    var input = document.getElementById("datepicker");
    var d = new Date();
    var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var month = d.getMonth(); //lấy tháng hiện tại
    var year = d.getFullYear(); //lấy năm hiện tại

    input.addEventListener("click", show);

    //HÀM HIỂN THỊ CALENDAR
    function show() {
        input.removeEventListener("click", show);
        var first_date = month_name[month] + " " + 1 + " " + year;
        //September 1 2014
        var tmp = new Date(first_date).toDateString();
        //Mon Sep 01 2014 ...
        var first_day = tmp.substring(0, 3); //Mon

        var day_no = day_name.indexOf(first_day); //1
        var days = new Date(year, month + 1, 0).getDate(); //30
        //Tue Sep 30 2014 ...
        var calendar = get_calendar(day_no, days);

        var div = document.createElement('div');
        div.className = "calendar-container";
        div.appendChild(calendar);
        if (input.nextSibling) { // Find the next sibling, and add newItem before it
            input.parentNode.insertBefore(div, input.nextSibling);
        } else { // In case the existingItem has no sibling after itself, append it
            input.parentNode.appendChild(div);
        }
    }

    //HÀM IN RA BẢNG CHO CALENDAR
    function get_calendar(day_no, days) {
        var table = document.createElement('table');
        var tr = document.createElement('tr');

        //nút prev year 
        var td = document.createElement('td');
        var prevY = document.createElement('button');
        prevY.innerHTML = "<<";
        prevY.onclick = function() {
            if (year > 1950) {
                year--;
                table.parentNode.removeChild(table);
                show();
            }

        };
        td.appendChild(prevY);
        tr.appendChild(td);

        //nút pre month
        td = document.createElement('td');
        var prevM = document.createElement('button');
        prevM.innerHTML = "<";
        prevM.onclick = function() {
            if (month > 0) {
                month--;
                table.parentNode.parentNode.removeChild(table.parentNode);
                show();
            }

        };
        td.appendChild(prevM);
        tr.appendChild(td);

        //chọn tháng năm
        //chọn tháng
        td = document.createElement('td');
        var listMonth = document.createElement('select');
        listMonth.onchange = function() {
            month = this.options[this.selectedIndex].value;
            console.log(this.options[this.selectedIndex].value);

            table.parentNode.parentNode.removeChild(table.parentNode);
            show();
            //listMonth.options[listMonth.selectedIndex].text = month_name[month];        
        };

        //chọn năm
        var listYear = document.createElement('select');
        listYear.onchange = function() {
            year = this.options[this.selectedIndex].value;
            console.log(this.options[this.selectedIndex].value);

            table.parentNode.parentNode.removeChild(table.parentNode);
            show();
        };
        for (var i = 0; i <= 11; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = month_name[i];
            if (i == month) {
                option.selected = true;
            }
            listMonth.appendChild(option);
        }
        for (var j = 1950; j <= d.getFullYear(); j++) {
            var option = document.createElement('option');
            option.value = j;
            option.text = j;
            if (j == year) {
                option.selected = true;
            }
            listYear.appendChild(option);
        }
        td.appendChild(listMonth);
        td.appendChild(listYear);
        //td.innerHTML = month_name[month]+" "+year;
        td.setAttribute("colspan", "3");
        tr.appendChild(td);

        //nút next month
        td = document.createElement('td');
        var nextM = document.createElement('button');
        nextM.innerHTML = ">";
        nextM.onclick = function() {
            if (month < 11) {
                month++;
                table.parentNode.parentNode.removeChild(table.parentNode);
                show();
            }

        };
        td.appendChild(nextM);
        tr.appendChild(td);
        table.appendChild(tr);

        //nút prev year 
        td = document.createElement('td');
        var nextY = document.createElement('button');
        nextY.innerHTML = ">>";
        nextY.onclick = function() {
            if (year < d.getFullYear()) {
                year++;
                table.parentNode.removeChild(table);
                show();
            }

        };
        td.appendChild(nextY);
        tr.appendChild(td);

        //IN TÊN NGÀY TRONG TUẦN
        tr = document.createElement('tr');
        for (var week_day = 0; week_day <= 6; week_day++) {
            td = document.createElement('td');
            td.innerHTML = day_name[week_day];
            td.className = "week";
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //IN NGÀY TRỐNG TRONG THÁNG
        tr = document.createElement('tr');
        var c;
        for (c = 0; c <= 6; c++) {
            if (c == day_no) {
                break;
            }
            td = document.createElement('td');
            td.innerHTML = "";
            tr.appendChild(td);
        }

        //BẮT ĐẦU IN NGÀY TRONG THÁNG
        var count = 1;
        for (; c <= 6; c++) {
            td = document.createElement('td');
            if (count == d.getDate() && month == d.getMonth && year == d.getFullYear()) {
                td.style.cssText = {
                    background: aqua
                };
            }
            td.innerHTML = count;
            td.className = "days";
            td.onclick = choseDate; //sự kiện chọn ngày
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
        for (var r = 3; r <= 7; r++) {
            tr = document.createElement('tr');
            for (var c = 0; c <= 6; c++) {
                if (count > days) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                if (count == d.getDate() && month == d.getMonth() && year == d.getFullYear()) {
                    td.style.cssText = 'background: aqua;';
                }
                td.innerHTML = count;
                td.className = "days";
                td.onclick = choseDate; //sự kiện chọn ngày
                count++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        //KẾT THÚC IN NGÀY
        return table;
    }

    //HÀM TRUYỀN NGÀY CHỌN VÀO INPUT
    function choseDate() {
        var div = this.parentNode.parentNode.parentNode;

        input.value = this.innerHTML + "/" + (parseInt(month) + 1) + "/" + year;
        div.parentNode.removeChild(div);
        input.addEventListener("click", show);
    }
};
