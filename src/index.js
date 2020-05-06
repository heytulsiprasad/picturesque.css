// add toggle class to switch

let $btn = $(".toggle-btn");

$btn.each(function() {
    $(this).click(function() {
        $(this).toggleClass("toggle-btn--active")
    })
})

// add slider functionality

let $slider = $(".range")

$slider.each(function() {
    let $prev = $(this).prev();

    $(this).change(function() {
        $prev.html(`<p>${this.value}</p>`);
    })
    $(this).mousemove(function() {
        $prev.html(`<p>${this.value}</p>`);
    })
})

