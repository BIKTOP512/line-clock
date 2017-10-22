(function (window, $) {
    function lineClock() {
        var $hours = $("#hours"),
            $minutes = $("#minutes"),
            $seconds = $("#seconds");

        initRow($hours, "h");
        initRow($minutes, "m");
        initRow($seconds, "s");

        setInterval(function () {
            var now = new Date();
            var hours = now.getHours();
            if (hours === 0)
                hours = 12;
            else if (hours > 12)
                hours -= 12;
            var minutes = now.getMinutes() + 5;
            var seconds = now.getSeconds() + 5;
            updateState($hours, hours);
            updateState($minutes, Math.floor((minutes / 5)));
            updateState($seconds, Math.floor((seconds / 5)));
        }
            , 1000);
    }

    function initRow($placeholder, prefix) {
        var cells = [];
        for (let i = 0; i < 12; ++i) {
            let cell = $("<div>").addClass("cell").attr("id", prefix + "-" + i).append("<div class='inner'>");
            cells.push(cell);
        }

        $placeholder.append(cells);
    }

    function updateState($row, activeCount) {
        var $cells = $row.find(".cell");
        for (let i = 0; i < activeCount; ++i) {
            $cells.eq(i).children().addClass("active");
        }
        for (let i = $cells.length - 1; activeCount <= i; --i) {
            $cells.eq(i).children().removeClass("active");
        }
    }

    window.lineClock = lineClock;
})(window, $);
