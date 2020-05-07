// add toggle class to switch

let $btn = $(".toggle-btn");

$btn.each(function() {
    $(this).click(function() {
        // toggle button active color on click
        $(this).toggleClass("toggle-btn--active")        
    })
})

// add slider functionality

let $slider = $(".range")

$slider.each(function() {
    let $num = $(this).prev().children().first().children().first()

    $(this).change(function() {
        $num.text(this.value);
    })
    $(this).mousemove(function() {
        $num.text(this.value);
    })
})

// toggle slider disable if button is active

$btn.each(function() {
    let ele = $(this);
    let input = ele.parent().next().children().last()

    ele.click(function() {
        if (ele.hasClass("toggle-btn--active")) {
            input.prop("disabled", false);
        } else {
            input.prop("disabled", true);
        }
    })
})


