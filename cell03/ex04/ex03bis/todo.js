function setcookie(cid, cvalue) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    document.cookie = cid + "=" + encodeURIComponent(cvalue) +
                      "; expires=" + date.toUTCString() + "; path=/";
}

function deletelist(cid) {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    document.cookie = cid + "=; expires=" + date.toUTCString() + "; path=/";
}

function addtask() {
    var input = prompt("กรอกงานใหม่:");
    if (input === null) return; // ยกเลิก
    var data = $.trim(input);
    let id = Date.now();
    if (data !== '') {
        addList(data, id);
        setcookie(id, data);
    }
}

function addList(value, id = 'None') {
    if (value === '' && id === 'None') return;

    var $div = $("<div>")
        .attr("id", id)
        .text(value)
        .on("dblclick", function() {
            deletelist($(this).attr("id"));
            $(this).remove();
        });

    $("#ft_list").prepend($div);
}

function checklist() {
    let data = document.cookie.split(";");
    for (let i = 0; i < data.length; i++) {
        let part = $.trim(data[i]);
        if (part === "") continue;
        let [key, ...rest] = part.split("=");
        let value = decodeURIComponent(rest.join("="));
        if (value) addList(value, key);
    }
}

// รอ DOM โหลดเสร็จ
$(document).ready(function() {
    checklist();
    $("#addBtn").on("click", addtask);
});
