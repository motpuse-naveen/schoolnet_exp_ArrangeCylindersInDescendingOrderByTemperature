
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
    var g_SplitContentSize = [];
    return {
        InitSplitter: function (p_sizes, whenresize) {
            $("#split-main").removeClass("v-split-main").removeClass("h-split-main");
            $("#split-main").removeAttr("style")
            if ($(".popup").is(":visible")) {
                var spltWdt = $(".wrapper").width();
                $("#split-main").css({ "width": spltWdt - POPUP_WIDTH })
            }
            if(whenresize!=undefined && whenresize!=null && whenresize==true){
                if(window.screen.availWidth<730){
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit();
                }
                else{
                    //$("#split-main").addClass("h-split-main");
                    //this.HorizontalSplit();
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit();
                }
            }
            else{
                if (window.matchMedia("(orientation: portrait)").matches) {
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit(p_sizes);
                }
                else {
                    //$("#split-main").addClass("h-split-main");
                    //this.HorizontalSplit(p_sizes);
                    $("#split-main").addClass("v-split-main");
                    this.VerticalSplit(p_sizes);
                }
            }
            //NM: Specific to SpringOscillation.
            //var sprcontht = $(".content-container.cc").height();
            //$(".content-container.cc").css({"height":sprcontht + "px"})
            //sprcontht = $(".content-container.sp").height();
            //$(".content-container.sp").css({"height":sprcontht + "px"})
        },
        HorizontalSplit: function (p_sizes) {
            var loc_sizes = [48, 52]
            if(p_sizes!=null && p_sizes!=undefined && p_sizes.length>1){
                loc_sizes = p_sizes;
            }
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                minSize: 200,
                sizes: loc_sizes,
                gutterSize: 1,
                onDrag: function (sizes) {
                    //debugger;
                    /* Scale Spring to fit */
                    ScreenSplitter.ScaleToFit($("#split-0"), null, 0, 0, "hsplit")
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"), null, 0, 0, "hsplit")
                },
                onDragEnd: function(sizes){
                    $("#split-0").attr("size",sizes[0]);
                    $("#split-1").attr("size",sizes[1])
                }
            })
            $(".gutter").append(horizontalHandle)
        },
        VerticalSplit: function (p_sizes) {
            var loc_sizes = [80, 20]
            if(p_sizes!=null && p_sizes!=undefined && p_sizes.length>1){
                loc_sizes = p_sizes;
            }
            var minsizes = this.GetMinSizeLimits();
            $(".gutter").remove();
            $("#split-0").removeAttr("style");
            $("#split-1").removeAttr("style");
            split_instance = Split(['#split-0', '#split-1'], {
                minSize: minsizes,
                sizes: loc_sizes,
                direction: 'vertical',
                gutterSize: 1,
                onDrag: function (sizes) {
                    /* Scale Spring to fit */
                    ScreenSplitter.ScaleToFit($("#split-0"), null, 0, 0, "vsplit")
                    /* Scale Graph to fit */
                    ScreenSplitter.ScaleToFit($("#split-1"), null, 0, 0, "vsplit")
                },
                onDragEnd: function(sizes){
                    $("#split-0").attr("size",sizes[0]);
                    $("#split-1").attr("size",sizes[1])
                }
            })
            $(".gutter").append(verticalHandle)
        },
        InitDragLimit: function () {
            /* NM: Calculate scale ratio and min size for spliter */
            var sprcontht = 0;
            g_SplitContentSize = [
                $("#split-0 .content-container.cc").height(),
                $("#split-1 .content-container.sp").height(),
            ];
            this.VerticalSplit();

            //NM: Specific to SpringOscillation.
            //$("#split-0 .content-container.cc").css({ "height": g_SplitContentSize[0] + "px" })
            //$("#split-1 .content-container.sp").css({ "height": g_SplitContentSize[1] + "px" })
        },
        GetMinSizeLimits: function(){
            var minsizes = [200, 100]
            
            if (g_SplitContentSize.length == 2) {
                //debugger;
                var totalHt = $("#split-main").height();
                //var partOfTotal0 = Math.trunc(totalHt / g_SplitContentSize[0]);
                var partOfTotal0 = totalHt / g_SplitContentSize[0];
                if (partOfTotal0 >= 4) {
                    partOfTotal0 = 4
                }
                else if(partOfTotal0 >= 3 ){
                    partOfTotal0 = 3.7;
                }
                else if(partOfTotal0>=2){
                    partOfTotal0 = 3.7;
                }
                else{
                    partOfTotal0 = 3.7;
                }
                //var partOfTotal1 = Math.trunc(totalHt / g_SplitContentSize[1]);
                //debugger
                var partOfTotal1 = totalHt / g_SplitContentSize[1];
                if (partOfTotal1 > 5) {
                    partOfTotal1 = 4
                }
                else if (partOfTotal1 >= 4) {
                    partOfTotal1 = 4
                }
                else if(partOfTotal1 >= 3){
                    partOfTotal1 = 3.5;
                }
                else if(partOfTotal1>=2){
                    partOfTotal1 = 3.5;
                }
                else{
                    partOfTotal1 = 3.5;
                }
                minsizes = [
                    g_SplitContentSize[0] / 4 * partOfTotal0,
                    g_SplitContentSize[1] / 4 * partOfTotal1,
                ]
            }

            return minsizes;
        },
        ScaleToFit: function ($wrapper,$element, deltaWidth, deltaHeight, splittype) {
            if($element==null || $element == undefined){
                $element = $wrapper.find(".content-container")
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
            }
            var scale;
            var wrapperSize = {
                width: $wrapper.width(),
                height: $wrapper.height()
            }
            scale = Math.min(
                wrapperSize.width/elmSize.width,
                wrapperSize.height/elmSize.height
            );
            //debugger;
            /*$element.css({
                transform: "scale(" + scale + ")"
            });*/
            var setOrigin = false;
            if((wrapperSize.width/elmSize.width) < (wrapperSize.height/elmSize.height)){
                console.log(wrapperSize.width-elmSize.width*scale)
            }
            if (scale < 1) {
                var transOrigin = "top center"
                if(splittype == "hsplit"){
                   
                    transOrigin = "top left";
                    $element.css({
                        "transform": "scale(" + scale + ")",
                        "transform-origin": transOrigin
                    });
                    var leftmargin = ($wrapper.width() - ($element.outerWidth() * scale))/2;
                    $element.css({"margin-left": leftmargin + "px"});
                }
                else{
                    $element.css({
                        "transform": "scale(" + scale + ")",
                        "transform-origin": transOrigin,
                        "margin":"0px auto"
                    });
                }
            }
            else{
                $element.css({
                    "transform": "scale(" + scale + ")",
                    "transform-origin": "top center",
                    "margin":"0px auto"
                });
            }
            $element.addClass("split-scaled").attr("scale",scale);
        },
        ResetSplit: function(){
            $(".split-scaled").removeAttr("scale").removeAttr("style").removeClass("split-scaled");
            this.InitSplitter();
            /* Scale Spring to fit */
            ScreenSplitter.ScaleToFit($("#split-0"));
            /* Scale Graph to fit */
            ScreenSplitter.ScaleToFit($("#split-1"));
        },
        ResetSplitOnPinchZoom: function(){
            var attr_sizes = []
            var splitPanel1Size = $("#split-0").attr("size");
            var splitPanel2Size = $("#split-1").attr("size");
            if(splitPanel1Size!=undefined && splitPanel1Size !="" && splitPanel2Size !=undefined && splitPanel2Size != ""){
                attr_sizes = [
                    Number(splitPanel1Size),
                    Number(splitPanel2Size)
                ]
                //alert(attr_sizes)
                this.InitSplitter(attr_sizes);
            }
            else{
                this.InitSplitter();
            }
        }
    }
})();