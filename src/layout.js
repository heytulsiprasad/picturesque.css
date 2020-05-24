// We will only show one of the images (which is being edited), below a
// particular breakpoint i.e. $bp-largest

let edited = `
    <div class="picture__box">
        <img id = "edit" class= "picture__img" src = "images/person-on-a-bridge-near-a-lake-747964.jpg"
        alt = "person-on-a-bridge" />
    </div >
`;

let both = `
    <div class="picture__box">
      <img id="edit" class="picture__img" src="images/person-on-a-bridge-near-a-lake-747964.jpg"
        alt="person-on-a-bridge" />
    </div>
    <div class="picture__box">
      <img id="original" class="picture__img" src="images/person-on-a-bridge-near-a-lake-747964.jpg"
        alt="person-on-a-bridge" />
    </div>
`;

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    $(".picture").html(edited);
  } else {
    $(".picture").html(both);
  }
}

var x = window.matchMedia("(max-width: 1300px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes
