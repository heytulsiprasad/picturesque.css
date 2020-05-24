///////////// functionality for components
// add toggle class to switch

let $btn = $(".toggle-btn");

$btn.each(function () {
  $(this).click(function () {
    // toggle button active color on click
    $(this).toggleClass("toggle-btn--active");
  });
});

// add slider functionality

let $slider = $(".range");

$slider.each(function () {
  let $num = $(this).prev().children().first().children().first();

  $(this).change(function () {
    $num.text(this.value);
  });
  $(this).mousemove(function () {
    $num.text(this.value);
  });
});

// toggle slider disable if button is active

$btn.each(function () {
  let ele = $(this);
  let input = ele.parent().next().children().last();

  ele.click(function () {
    if (ele.hasClass("toggle-btn--active")) {
      input.prop("disabled", false);
    } else {
      input.prop("disabled", true);
    }
  });
});

///////////////// dynamic styling
// these are called filter elements inside star object

let star = {
  blur: "",
  brightness: "",
  contrast: "",
  grayscale: "",
  hue: "",
  invert: "",
  opacity: "",
  saturate: "",
  sepia: "",
};

let allStyles = function () {
  return `${star.blur} ${star.brightness} ${star.contrast} ${star.grayscale} ${star.hue} ${star.invert} ${star.opacity} ${star.saturate} ${star.sepia}`;
};

// code block instance
let $codeblock = $("#code");

// shows the live code from the inline css on the edit image
let showCode = function () {
  let css = $("#edit").attr("style");
  if (css === "") {
    css = "No styles added! Keep adding.";
  }
  $codeblock.html(css);
};

// gives values to those filter elements inside star object
let eachStyle = function (prop, num, unit) {
  // prop refers to filters like blur, contrast...
  // num refers to the value the slider currently has
  // unit is px/deg/% as per written in html

  switch (prop) {
    case "blur":
      star.blur = `blur(${num}${unit})`;
      break;
    case "brightness":
      star.brightness = `brightness(${num}${unit})`;
      break;
    case "contrast":
      star.contrast = `contrast(${num}${unit})`;
      break;
    case "grayscale":
      star.grayscale = `grayscale(${num}${unit})`;
      break;
    case "hue-rotate":
      star.hue = `hue-rotate(${num}${unit})`;
      break;
    case "invert":
      star.invert = `invert(${num}${unit})`;
      break;
    case "opacity":
      star.opacity = `opacity(${num}${unit})`;
      break;
    case "saturate":
      star.saturate = `saturate(${num}${unit})`;
      break;
    case "sepia":
      star.sepia = `sepia(${num}${unit})`;
      break;
  }
};

// makes the desired star property as empty ("")
// to be called when a switch is turned off
// so that it's properties get nullified
let eachNull = function (prop) {
  // prop refers to the filters

  switch (prop) {
    case "blur":
      star.blur = "";
      break;
    case "brightness":
      star.brightness = "";
      break;
    case "contrast":
      star.contrast = "";
      break;
    case "grayscale":
      star.grayscale = "";
      break;
    case "hue-rotate":
      star.hue = "";
      break;
    case "invert":
      star.invert = "";
      break;
    case "opacity":
      star.opacity = "";
      break;
    case "saturate":
      star.saturate = "";
      break;
    case "sepia":
      star.sepia = "";
      break;
  }
};

let allNull = function () {
  star = {
    blur: "",
    brightness: "",
    contrast: "",
    grayscale: "",
    hue: "",
    invert: "",
    opacity: "",
    saturate: "",
    sepia: "",
  };

  return;
};

// $btn refers to the switch for every filter in the page
// this adds a callback function to each one of them
$btn.each(function () {
  // current button
  let $ele = $(this);

  // current filter name to which the switch is attached
  let prop = $ele.next().text().trim();

  // selects the div with class "range__content"
  // this holds slider values, refer slider functionality (up)
  let $value = $ele.parent().next().find(".range__content");

  // the numeric value obtained from the slider
  let num = $value.children().first().text();

  // the unit obtained from the html
  let unit = $value.children().last().text();

  // jquery object holding current slider
  let $slide = $ele.parent().next().find(".range");

  // native DOM object is made from jquery object for functionality
  // of mouseover (coz, mouseover changed values without slider thumb moving otherwise)
  let slideDOM = $slide.get();

  // $ele, refers to each button (in iteration)
  // adds a callback to be executed once the switch is clicked
  $ele.click(function () {
    // if switch is active then run this block
    if ($ele.hasClass("toggle-btn--active")) {
      let design;

      // change event happens when slider is stopped
      $(slideDOM).change(function () {
        // assigns num the latest slider value
        num = this.value;

        // eachStyle then sets the `star` object accordingly
        eachStyle(prop, num, unit);

        // allStyles now creates a string to be displayed as inline css
        design = allStyles();

        // adds the filters at last
        $("#edit").css("filter", design);

        // instantly shows the code, as in inline css
        showCode();
      });

      // mousemove event happens when slider is being moved
      $(slideDOM).mousemove(function () {
        num = this.value;
        eachStyle(prop, num, unit);
        design = allStyles();
        $("#edit").css("filter", design);
        showCode();
      });

      // if switch is clicked and made off this block runs
    } else {
      // holds all the inline styles
      let style = $("#edit").attr("style");

      if (style !== undefined) {
        // stores only css properties like, blur(5px) invert(1%)...
        let filters = style.split(":")[1].split(";")[0].trim();

        // this selects the css property from above,
        // of the current `prop` of switch which is being turned off
        let regex = new RegExp(
          `${prop}\\([0-9]+(\\.[0-9]{1,3})?(%|px|deg)?\\)`,
        );

        if (filters.includes(prop)) {
          // $slide is slide of the btn which is clicked
          // setting the slider value and its span text to zero
          // after user turns off the switch
          $slide.val("0");
          $slide.prev().find(".range__num").text("0");

          // reassigning respective design variables to "" to cancel their effect
          // otherwise it will remain like blur(0)
          // prop = current filter i.e. being switched off

          // makes the required star property as empty ("")
          eachNull(prop);

          // creates our new string from star object
          let design = allStyles();

          // now removes the element at all from the filter string
          design = design.replace(regex, "").trim();

          $("#edit").css("filter", design);
          showCode();
        } else {
          console.log("Doesnt exist!");
        }
      } else {
        console.log("You're not styled baby!");
      }
    }
  });
});

// adding event listener to upload btn
$("#file-upload").change(function () {
  loadFile(event);
});

// loading the uploaded image
let loadFile = function (event) {
  src = URL.createObjectURL(event.target.files[0]);
  $("#edit").attr("src", src);
  $("#original").attr("src", src);
};

// adding reset btn functionality
$("#reset").click(function () {
  allNull();

  $btn.each(function () {
    let $ele = $(this);
    $ele.removeClass("toggle-btn--active");

    let prop = $ele.next().text().trim();

    let $value = $ele.parent().next().find(".range__content");
    $value.children().first().text("0");

    let $slide = $ele.parent().next().find(".range");
    $slide.val("0");

    $slide.prop("disabled", true);
    $("#edit").attr("style", "");
    showCode();
  });
});
