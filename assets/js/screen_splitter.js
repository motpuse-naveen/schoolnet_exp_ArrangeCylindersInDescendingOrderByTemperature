
var split_instance;
var ScreenSplitter = (function () {
    const horizontalHandle = `<div class="h-handle gutter_handle">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
            <circle class="cls-100" cx="18" cy="18" r="18"/>
            <polyline class="cls-101" points="13.99 23.37 8.62 18 13.99 12.63"/>
            <polyline class="cls-101" points="22.01 12.63 27.38 18 22.01 23.37"/>
        </g>
    </g>
</svg>
    </div>`;
    const verticalHandle = `<div class="v-handle gutter_handle">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
            <circle class="cls-100" cx="18" cy="18" r="18"/>
            <polyline class="cls-101" points="12.63 13.99 18 8.62 23.37 13.99"/>
            <polyline class="cls-101" points="23.37 22.01 18 27.38 12.63 22.01"/>
        </g>
    </g>
</svg>
    </div>`;

    return {
        InitSplitter: function () {
            $("#split-main").removeClass("v-split-main").removeClass("h-split-main");
            $("#split-main").removeAttr("style")
            if (window.matchMedia("(orientation: portrait)").matches) {
                $("#split-main").addClass("v-split-main");
                this.VerticalSplit();
            }
            else {
                $("#split-main").addClass("h-split-main");
                this.HorizontalSplit();
            }
            //NM: Specific to SpringOscillation.
            var sprcontht = $(".spingContainer").height();
            $(".spingContainer").css({"height":sprcontht + "px"});
            $(".gutter").css("pointer-events", "none");
        },
        HorizontalSplit: function () {
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                minSize: 200,
                sizes: [48, 52],
                gutterSize: 1,
                onDrag: function (sizes) {
                    /* Scale Spring to fit */
                    ScreenSplitter.ScaleToFit($("#split-0"));
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"));
                },
            });
            // $(".gutter").append(horizontalHandle);
        },
        VerticalSplit: function () {
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                sizes: [60, 40],
                direction: 'vertical',
                gutterSize: 1,
                onDrag: function (sizes) {
                    /* Scale Spring to fit */
                    ScreenSplitter.ScaleToFit($("#split-0"));
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"));
                },
            });
            // $(".gutter").append(verticalHandle);
        },
        ScaleToFit: function ($wrapper,$element, deltaWidth, deltaHeight) {
            if($element==null || $element == undefined){
                $element = $wrapper.find(".content-container");
            }
            if(deltaWidth==null || deltaWidth == undefined){
                deltaWidth = 0;
            }
            if(deltaHeight==null || deltaHeight == undefined){
                deltaHeight = 0;
            }
            /*
            var elmSize = {
                width: $element.get(0).scrollWidth + deltaWidth,
                height: $element.get(0).scrollHeight + deltaHeight
            }*/
            var elmSize = {
                width: $element.outerWidth() + deltaWidth,
                height: $element.outerHeight() + deltaHeight
            };
            var scale;
            var wrapperSize = {
                width: $wrapper.width(),
                height: $wrapper.height()
            };
            scale = Math.min(
                wrapperSize.width/elmSize.width,
                wrapperSize.height/elmSize.height
            );
            if (scale < 1) {
                $element.css({
                    transform: "scale(" + scale + ")"
                });
            }
            else{
                scale = 1;
                $element.css({
                    "transform": "scale(" + scale + ")"
                });
            }
            $element.attr("scale",scale);
        }
    };
})();