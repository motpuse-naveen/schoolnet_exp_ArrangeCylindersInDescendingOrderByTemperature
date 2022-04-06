/*DND-2 Preloader */
var imagePreCount = 0;
var audioPreCount = 0;
var imgPreloadArray = new Array(
  "assets/images/birds/eagle.svg",
  "assets/images/birds/hornbill.svg",
  "assets/images/birds/owl.svg",
  "assets/images/birds/parrot.svg",
  "assets/images/birds/pelican.svg",
  "assets/images/birds/pigeon.svg",
  "assets/images/birds/robin.svg",
  "assets/images/birds/sparrow.svg",
  "assets/images/birds/swan.svg",
  "assets/images/birds/woodpecker.svg",
  "assets/images/arrow-left-bottom.png",
  "assets/images/arrow-left-top.png",
  "assets/images/arrow-right-bottom.png",
  "assets/images/arrow-right-top.png",
  "assets/images/check-icn.svg",
  "assets/images/drag-btn-horizontal.svg",
  "assets/images/drag-btn-vertical.svg",
  "assets/images/logo.svg",
  "assets/images/next-arrow.svg",
  "assets/images/phone-landscape-pngrepo-com.png",
  "assets/images/phone-portrait-pngrepo-com.png",
  "assets/images/texture.svg",
  "assets/images/theme-icon-outline-left.svg",
  "assets/images/theme-icon-outline-right.svg",
  "assets/images/watermark-2.png",
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
