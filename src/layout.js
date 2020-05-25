// We will only show one of the images (which is being edited), below a
// particular breakpoint i.e. $bp-largest

function edited() {
  return `
    <div class="picture__box">
        ${$(".picture__box").html().trim()}
    </div >
`;
}

function both() {
  return `
    <div class="picture__box">
        ${$(".picture__box").html().trim()}
    </div>
    <div class="picture__box">
      <img id="original" class="picture__img" src="https://picsum.photos/1280/808"
        alt="person-on-a-bridge" />
    </div>
`;
}

function changeImage(x) {
  if (x.matches) {
    // If media query matches
    $(".picture").html(edited());
  } else {
    $(".picture").html(both());
  }
}

let query = window.matchMedia("(max-width: 1300px)");
changeImage(query); // Call listener function at run time
query.addListener(changeImage); // Attach listener function on state changes
