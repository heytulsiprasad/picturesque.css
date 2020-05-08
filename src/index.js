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


// dynamic styling
// these are called design elements

let star = {
    blur: "",
    brightness: "",
    contrast: "",
    grayscale: "",
    hue: "",
    invert: "",
    opacity: "",
    saturate: "",
    sepia: ""
}

// code block instance
let $codeblock = $("#code")

$btn.each(function() {
    let $ele = $(this); // current button
    
    let prop = $ele.next().text().trim()
    let $value = $ele.parent().next().find(".range__content")
    let num = $value.children().first().text()
    let unit = $value.children().last().text()

    // jquery object holding current slider
    let $slide = $ele.parent().next().find(".range")

    // native DOM object is made from jquery object for functionality
    // of mouseover (coz, mouseover changed values without slider thumb moving otherwise)
    let slideDOM = $slide.get();

    // gives value to those global design elements
    let eachStyle = function() {
        switch (prop) {
            case "blur":
                star.blur = `blur(${num}${unit})`
                break;
            case "brightness":
                star.brightness = `brightness(${num}${unit})`
                break;
            case "contrast":
                star.contrast = `contrast(${num}${unit})`
                break;
            case "grayscale":
                star.grayscale = `grayscale(${num}${unit})`
                break;
            case "hue-rotate":
                star.hue = `hue-rotate(${num}${unit})`
                break;
            case "invert":
                star.invert = `invert(${num}${unit})`
                break;
            case "opacity":
                star.opacity = `opacity(${num}${unit})`
                break;
            case "saturate":
                star.saturate = `saturate(${num}${unit})`
                break;
            case "sepia":
                star.sepia = `sepia(${num}${unit})`
                break;
        }
    }

    let allStyles = function() {
        let design = `${star.blur} ${star.brightness} ${star.contrast} ${star.grayscale} ${star.hue} ${star.invert} ${star.opacity} ${star.saturate} ${star.sepia}`
        return design;
    }

    let showCode = function() {
        let css = $("#edit").attr("style");
        if (css === "") {
            css = "No styles added! Keep adding."
        }
        $codeblock.html(css);
    }
 
    $ele.click(function() {   
        if ($ele.hasClass("toggle-btn--active")) {
            let design;
            
            $(slideDOM).change(function() {
                num = this.value;
                eachStyle();
                design = allStyles();
                $("#edit").css("filter", design)
                showCode();
            })
            $(slideDOM).mousemove(function() {
                num = this.value;
                eachStyle();
                design = allStyles();
                $("#edit").css("filter", design)
                showCode();
            })
        } else {
            let style = $("#edit").attr("style")

            if (style !== undefined) {                
                let filters = style.split(":")[1].split(";")[0].trim()
                let regex = new RegExp(`${prop}\\([0-9]+(\\.[0-9]{1,3})?(%|px|deg)?\\)`)

                if(filters.includes(prop)) {
                    // $slide is slide of the btn which is clicked
                    // setting the slider value and its span text to zero
                    // after user turns off the switch
                    $slide.val("0")
                    $slide.prev().find(".range__num").text("0")

                    // reassigning respective design variables to "" to cancel their effect
                    // otherwise it will remain like blur(0)
                    // prop = current filter i.e. being switched off

                    switch (prop) {
                        case "blur":
                            star.blur = ""
                            break;
                        case "brightness":
                            star.brightness = ""
                            break;
                        case "contrast":
                            star.contrast = ""
                            break;
                        case "grayscale":
                            star.grayscale = ""
                            break;
                        case "hue-rotate":
                            star.hue = ""
                            break;
                        case "invert":
                            star.invert = ""
                            break;
                        case "opacity":
                            star.opacity = ""
                            break;
                        case "saturate":
                            star.saturate = ""
                            break;
                        case "sepia":
                            star.sepia = ""
                            break;
                    }

                    let design = allStyles();
                    design = design.replace(regex, "").trim();

                    $("#edit").css("filter", design);
                    showCode();

                } else {
                    console.log("Doesnt exist!")
                }
            } else {
                console.log("You're not styled baby!")
            }
        }
    })
})

// adding event listener to upload btn
$("#upload").change(function() {
    loadFile(event)
})

// loading the uploaded image
let loadFile = function(event) {
	src = URL.createObjectURL(event.target.files[0]);
    $("#edit").attr("src", src);
    $("#original").attr("src", src);
};

// adding reset btn functionality
