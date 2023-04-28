/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array(
  "assets/images/logo.svg",
  "assets/images/exploriment-Logo.svg",
  "assets/images/phone-landscape-pngrepo-com.png",
  "assets/images/phone-portrait-pngrepo-com.png",
  "assets/images/texture.svg",
  "assets/images/theme-icon-outline-left.svg",
  "assets/images/theme-icon-outline-right.svg",
  "assets/images/watermark-2.png",
  "assets/images/W_01.svg",
  "assets/images/W_02.svg",
  "assets/images/W_03.svg",
  "assets/images/W_04.svg",
  "assets/images/W_05.svg",
  "assets/images/W_06.svg",
  "assets/images/Top_BG.png",
  "assets/images/Top_BG.svg",
  "assets/images/writing_pad.svg",
  "assets/images/thermometer.svg",
  "assets/images/Cylinder_Base.svg",
  "assets/images/screen1.png",
  "assets/images/screen2.png",
  "assets/images/screen3.png",
  "assets/images/screen4.png",
  "assets/images/screen5.png",
  "assets/images/screen6.png",
  "assets/images/screen7.png",
  "assets/images/screen8.png",
  "assets/images/screen9.png",
  "assets/images/scratchpad1.png",
  "assets/images/scratchpad2.png",
  "assets/images/scratchpad3.png",
  "assets/images/Arrow_01_1.png",
  "assets/images/Arrow_02.png",
  "assets/images/Arrow_03.png",
);

/*--Audio--*/
var audioPreloadArray = [];
$(document).ready(function () { });
//Html is bydefault added to html
//generatePreloader();
setTimeout(function () {
  preloadImages();
}, 50);

function generatePreloader() {
  var preloaderhtml = `<div class="preloader">
  <div class="preloadpanel">
     <div class="preloadingInstr">
         <div class="progress"></div>
         <div class="progress-text">
             Loading ... 100%
         </div>
     </div>
 </div> 
</div>`;
  $("body").append(preloaderhtml);
}

function preloadImages() {
  imagePreCount = 0;
  for (var pId = 0; pId < imgPreloadArray.length; pId++) {
    var img = new Image();
    img.onload = imagePreloaded;
    img.src = imgPreloadArray[pId];
  }
}
function imagePreloaded() {
  imagePreCount++;
  var percentageload = Number(
    ((imagePreCount / imgPreloadArray.length) * 100).toFixed(0)
  );
  $(".preloader .progress-text").text("Loading..." + percentageload + "%");
  if (imagePreCount == imgPreloadArray.length) {
    setTimeout(function () {
      $(".preloader").remove();
      $(".container-so.launch").show();
      ActivityShell.Init();
    }, 50);
  }
}
