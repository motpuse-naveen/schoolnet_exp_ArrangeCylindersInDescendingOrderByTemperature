var noOfDigits = 1;
var maxTerms = 2;
var birdNameArray = [
  "eagle",
  "hornbill",
  "owl",
  "parrot",
  "pelican",
  "pigeon",
  "robin",
  "sparrow",
  "swan",
  "woodpecker",
];
var birdPluralArray = [
  "eagles",
  "hornbills",
  "owls",
  "parrots",
  "pelicans",
  "pigeons",
  "robins",
  "sparrows",
  "swans",
  "woodpeckers",
];
var birdVarNameArray = ["a", "b", "c", "d", "e", "x", "y", "z", "n", "m"];
var mStr = "";
var birdCountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var birdOrderArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var exprOrderArray = [0, 1, 2, 3, 4];
var exprCoeffArray = [1,1,1,1,1]

var screenMCXArray = new Array(5);
var screenMCYArray = new Array(5);
var screenTextArray = new Array(5);

for (var i = 0; i <= 4; i++) {
  screenMCXArray[i] = $("#set_mc").find("#" + birdNameArray[i] + "Set_mc").css("left");
  screenMCYArray[i] = $("#set_mc").find("#" + birdNameArray[i] + "Set_mc").css("top");
  screenTextArray[i] = $("#set_mc").find("#bird" + (i + 1) + "_set_mc_txt");
}

var explainMCXArray = new Array(5);
var explainMCYArray = new Array(5);
var explainTextArray = new Array(5);

for (var j = 0; j <= 4; j++) {
  explainMCXArray[j] = $("#explain_mc").find("#" + birdNameArray[j] + "Explain_mc").css("left");
  explainMCYArray[j] = $("#explain_mc").find("#" + birdNameArray[j] + "Explain_mc").css("top");
  explainTextArray[j] = $("#explain_mc").find("#bird" + (j + 1) + "_birdsExplain_txt");
}

var curQtnNo = 1;
var totalQtns = 0;
var correctQtns = 0;
$(".score_txt").text("" + correctQtns + "/" + totalQtns);

var noOfTerms;
var valueOfExpr = 0;

var EvaluateAlgebraicExpressions = (function () {
  return {
    LaunchActivity: function () {
      for (var i = 0; i < birdNameArray.length; i++) {
        initSet($("#set_mc").find("#" + birdNameArray[i] + "Set_mc"), birdNameArray[i] + "Pix_sym");
      }
      noOfDigits = Number($("#noOfDigitsInput_txt").val());
      maxTerms = Number($("#maxTermsInput_txt").val());
      resetExperiment();
    },
    OnOrientationChange: function () {
    },
  };
})();

$(".noOfDigits_cont .btn_minus").on("click", function () {
  noOfDigits_cmb_Listener("minus");
});

$(".noOfDigits_cont .btn_plus").on("click", function () {
  noOfDigits_cmb_Listener("plus");
});

function noOfDigits_cmb_Listener(id) {
  var min = Number($("#noOfDigitsInput_txt").attr('min'));
  var value = Number($("#noOfDigitsInput_txt").val());
  var max = Number($("#noOfDigitsInput_txt").attr('max'));
  if (id === "minus") {
    value = Number($($("#noOfDigitsInput_txt").val(value - 1)).val());
  }
  if (id === "plus") {
    value = Number($($("#noOfDigitsInput_txt").val(value + 1)).val());
  }

  if (value === min) {
    $(".noOfDigits_cont .btn_minus").attr("disabled", "disaled");
  } else {
    $(".noOfDigits_cont .btn_minus").removeAttr("disabled");
  }

  if (value === max) {
    $(".noOfDigits_cont .btn_plus").attr("disabled", "disaled");
  } else {
    $(".noOfDigits_cont .btn_plus").removeAttr("disabled");
  }

  noOfDigits = value;
  resetExperiment();
}

$(".maxTerms_cont .btn_minus").on("click", function () {
  maxTerms_cmb_Listener("minus");
});

$(".maxTerms_cont .btn_plus").on("click", function () {
  maxTerms_cmb_Listener("plus");
});

function maxTerms_cmb_Listener(id) {
  var min = Number($("#maxTermsInput_txt").attr('min'));
  var value = Number($("#maxTermsInput_txt").val());
  var max = Number($("#maxTermsInput_txt").attr('max'));
  if (id === "minus") {
    value = Number($($("#maxTermsInput_txt").val(value - 1)).val());
  }
  if (id === "plus") {
    value = Number($($("#maxTermsInput_txt").val(value + 1)).val());
  }

  if (value === min) {
    $(".maxTerms_cont .btn_minus").attr("disabled", "disaled");
  } else {
    $(".maxTerms_cont .btn_minus").removeAttr("disabled");
  }

  if (value === max) {
    $(".maxTerms_cont .btn_plus").attr("disabled", "disaled");
  } else {
    $(".maxTerms_cont .btn_plus").removeAttr("disabled");
  }

  maxTerms = value;
  resetExperiment();
}

function resetExperiment() {
  mStr = "";
  curQtnNo = 1;
  totalQtns = 0;
  correctQtns = 0;
  $(".score_txt").text("" + correctQtns + "/" + totalQtns);
  $("#next_btn").hide();
  newQuestion();
}

function newQuestion() {
  $("#explain_mc").hide();
  var tenFactor = 1;
  for (var i = 1; i <= noOfDigits; i++) {
    tenFactor = tenFactor * 10;
  }

  for (var j = 0; j < birdNameArray.length; j++) {
    birdCountArray[j] = parseInt(Math.random() * (tenFactor - 1)) + 1;
    $("#set_mc").find("#" + birdNameArray[j] + "Set_mc").hide();
    $("#set_mc").find("#" + birdNameArray[j] + "Set_mc").css({ left: 0, top: 0 });
  }

  shuffle(birdOrderArray);

  for (var k = 0; k <= 4; k++) {
    // showSet($("#set_mc").find("#"+birdNameArray[birdOrderArray[k]] + "Set_mc"), birdCountArray[birdOrderArray[k]]);
    $("#set_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Set_mc").show();
    // $("#set_mc").find("#"+birdNameArray[birdOrderArray[k]] + "Set_mc").css({left: screenMCXArray[k], top: screenMCYArray[k]});
    $("#set_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Set_mc").css({ left: Math.round($(screenTextArray[k]).position().left) - 20, top: Math.round($(screenTextArray[k]).position().top) + 8 });
    $(screenTextArray[k]).text("" + birdVarNameArray[birdOrderArray[k]] + " = " + "No. of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]);
  }

  shuffle(exprOrderArray);

  $(".qNo_txt").html("<div>Q " + curQtnNo + "</div><div> What is the value of:<div>");
  $("#explain_mc").hide();
  $("#OK_btn").show();
  $(".correct_mc").hide();
  $(".wrong_mc").hide();
  $(".ans_content").removeClass("wrong_txt");
  $("#numbInput_txt").val('');
  $("#numbInput_txt").removeAttr("disabled");

  noOfTerms = parseInt(Math.random() * (maxTerms - 1)) + 2;
  mStr = "";
  valueOfExpr = 0;
  fillExprCoeffArray()
  for (var l = 0; l < noOfTerms; l++) {
    if (exprCoeffArray[l] > 1) {
			mStr = mStr + exprCoeffArray[l] 
		}
    mStr = mStr + birdVarNameArray[birdOrderArray[exprOrderArray[l]]];
    valueOfExpr = valueOfExpr + exprCoeffArray[l] * birdCountArray[birdOrderArray[exprOrderArray[l]]];
    mStr = mStr + " + ";
  }

  mStr = mStr.substring(0, mStr.length - 3);
  $(".correctAnswer_txt").hide();
  $(".correctAnswer_txt").html("");
  $("#next_btn").hide();
  $("#explain_btn").hide();
  $(".qtn_txt").text(mStr);
}
function fillExprCoeffArray() {
	var mNo
	var mFlag = true
	while (mFlag) {
		for (var i = 0; i <noOfTerms; i++) {
			mNo = parseInt(Math.random() * 20) - 15
			mNo = Math.max(mNo, 1)
			exprCoeffArray[i] = mNo
		}
		for (var i = 0; i < noOfTerms; i++) {
			if (exprCoeffArray[i] > 1) {
				mFlag = false
				break;
			}
		}
	}
}
function initSet(my_mc, myLibStr) {
  // var mRow, mCol;
  var pix_mc;

  // for (var i = 1; i <= 1; i++) {
  pix_mc = ('<div class="' + myLibStr + '"> </div>');
  $(my_mc).append(pix_mc);
  /* mRow = parseInt((i-1)/3);
  mCol = (i-1) - 3*mRow;
  $(pix_mc).css({ left: 50, top: 50});		 */
  // }  
}

/* function initSet(my_mc, myLibStr) {
  var mRow, mCol;
  var pix_mc;

  for (var i = 1; i <= 9; i++) {
    pix_mc = ('<div id="pix'+ i +'_mc" class="'+myLibStr+'"> </div>');
    $(my_mc).append(pix_mc);
    mRow = parseInt((i-1)/3);
    mCol = (i-1) - 3*mRow;
    $(pix_mc).css({ left: mCol*50, top: mRow*50});		
  }

  for (var j = 1; j <= 36; j++) {
    pix_mc = ('<div id="pixSmall'+ j +'_mc" class="'+myLibStr+'"> </div>');
    $(my_mc).append(pix_mc);
    mRow = parseInt((j-1)/6);
    mCol = (j-1) - 6*mRow;
    $(pix_mc).css({width: 25, height:25});		
    $(pix_mc).css({left: mCol*25, top: mRow*25});
  }
}

function showSet(my_mc, myCount) {
  var mRow, mCol;
  var pix_mc; 
	
  if (myCount <= 9) {
    for (var i  = 1; i <=9; i++) {
      if((i <= myCount)){
        $(my_mc).find('#pix' + i + '_mc').show();
      }else{
        $(my_mc).find('#pix' + i + '_mc').hide();
      }
    }
    for (var j = 1; j <= 36; j++) {
      $(my_mc).find('#pixSmall' + j + '_mc').hide();
    }
  	
    switch (myCount) {
      case 1 :
        $(my_mc).find("#pix1_mc").css({left: 50, top: 50});
        break;
    	
      case 2 :
        $(my_mc).find("#pix1_mc").css({left: 15, top: 50});
        $(my_mc).find("#pix2_mc").css({left: 85, top: 50});
        break;

      case 3 :
        $(my_mc).find("#pix1_mc").css({left: 50, top: 25});
        $(my_mc).find("#pix2_mc").css({left: 15, top: 75});
        $(my_mc).find("#pix3_mc").css({left: 85, top: 75});
        break;
      	
      case 4 :
        $(my_mc).find("#pix1_mc").css({left: 15, top: 25});
        $(my_mc).find("#pix2_mc").css({left: 85, top: 25});
        $(my_mc).find("#pix3_mc").css({left: 15, top: 75});
        $(my_mc).find("#pix4_mc").css({left: 85, top: 75});
        break;

      case 5 :
        $(my_mc).find("#pix1_mc").css({left: 15, top: 15});
        $(my_mc).find("#pix2_mc").css({left: 85, top: 15});
        $(my_mc).find("#pix3_mc").css({left: 50, top: 50});
        $(my_mc).find("#pix4_mc").css({left: 15, top: 85});
        $(my_mc).find("#pix5_mc").css({left: 85, top: 85});
        break;

      case 6 :
        $(my_mc).find("#pix1_mc").css({left: 10, top: 10});
        $(my_mc).find("#pix2_mc").css({left: 90, top: 10});
        $(my_mc).find("#pix3_mc").css({left: 25, top: 50});
        $(my_mc).find("#pix4_mc").css({left: 75, top: 50});
        $(my_mc).find("#pix5_mc").css({left: 10, top: 90});
        $(my_mc).find("#pix6_mc").css({left: 90, top: 90});
        break;
      	
      case 7 :
        for (var k = 1; k <= 6; k++) {
          pix_mc = $(my_mc).find('#pix' + k + '_mc');
          mRow = parseInt((k-1)/3);
          mCol = (k-1) - 3*mRow;
          $(pix_mc).css({left: mCol*50, top: mRow*50});
        }
        $(my_mc).find("#pix7_mc").css({left: 50, top: 100});
        break;

      case 8 :
        for (var l = 1; l <= 6; l++) {
          pix_mc = $(my_mc).find('#pix' + l + '_mc');
          mRow = parseInt((l-1)/3);
          mCol = (l-1) - 3*mRow;
          $(pix_mc).css({left: mCol*50, top: mRow*50});
        }
        $(my_mc).find("#pix7_mc").css({left: 0, top: 100});
        $(my_mc).find("#pix8_mc").css({left: 100, top: 100});
        break;
    	
      case 9 :
        for (var m = 1; m <= 9; m++) {
          pix_mc = $(my_mc).find('#pix' + m + '_mc');
          mRow = parseInt((m-1)/3);
          mCol = (m-1) - 3*mRow;
          $(pix_mc).css({left: mCol*50, top: mRow*50});
        }
        break; 				
    }
  }
  else {
    for (var n  = 1; n <=9; n++) {
      $(my_mc).find('#pix' + n + '_mc').hide();
    }
    for (var o = 1; o <= 36; o++) {
      $(my_mc).find('#pixSmall' + o + '_mc').show();
    }
  	
    for (var p = 1; p <= 36; p++) {
      pix_mc = $(my_mc).find('#pixSmall' + p + '_mc');
      mRow = parseInt((p-1)/6);
      mCol = (p-1) - 6*mRow;
      $(pix_mc).css({width: 25, height:25});		
      $(pix_mc).css({left: 18 + mCol*22 + parseInt(Math.random()*20) - 10, top: 18 + mRow*22 + parseInt(Math.random()*20) - 10});
    }		
  }		
} */

$("#btn_reset").on("click", function () {
  resetExperiment();
});

$("#OK_btn").on("click", function () {
  $("#OK_btn").hide();
  $("#next_btn").show();
  $("#explain_btn").show();
  $("#numbInput_txt").attr("disabled", "disabled");
  if (Number($("#numbInput_txt").val()) == valueOfExpr) {
    correctQtns++;
    totalQtns++;
    $(".score_txt").text("" + correctQtns + "/" + totalQtns);
    $(".correct_mc").show();
    $(".ans_content").removeClass("wrong_txt");
  } else {
    totalQtns++;
    $(".score_txt").text("" + correctQtns + "/" + totalQtns);
    $(".wrong_mc").show();
    $(".correctAnswer_txt").show();
    $(".correctAnswer_txt").html("Correct Answer = <span>" + valueOfExpr + "</span>");
    $(".ans_content").addClass("wrong_txt");
  }
});

$("#next_btn").on("click", function () {
  curQtnNo++;
  newQuestion();
});

$("#explain_btn").on("click", function () {
  $("#explain_mc").show();

  for (var i = 0; i < birdNameArray.length; i++) {
    $("#explain_mc").find("#" + birdNameArray[i] + "Explain_mc").hide();
    $("#explain_mc").find("#" + birdNameArray[i] + "Explain_mc").css({ left: 0, top: 0 });
  }

  for (var k = 0; k <= 4; k++) {
    console.log(explainMCXArray[k], explainMCYArray[k]);
    $("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").show();
    // $("#explain_mc").find("#"+birdNameArray[birdOrderArray[k]] + "Explain_mc").css({left: explainMCXArray[k], top: explainMCYArray[k]});   
    $("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").css({ left: Math.round($(explainTextArray[k]).position().left) + 30, top: Math.round($(explainTextArray[k]).position().top) });
    $(explainTextArray[k]).text("" + birdVarNameArray[birdOrderArray[k]] + " = " + "Number of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]);

    var col = $(".Explain_mc_birdrow").find(".bird"+ (k+1))
    col.empty();
    col.append($("#explain_mc").find("#" + birdNameArray[birdOrderArray[k]] + "Explain_mc").clone().removeAttr("id").removeAttr("style"))
    col.append($("<p class='bold birdtext'>").text("" + birdVarNameArray[birdOrderArray[k]] + " = " + "Number of " + birdPluralArray[birdOrderArray[k]] + " = " + birdCountArray[birdOrderArray[k]]));
  }

  for (var j = 0; j <= 4; j++) {
    if (j < noOfTerms) {
      mStr = ""
      if (exprCoeffArray[j] > 1) {
				mStr = mStr + exprCoeffArray[j]
			}
      mStr = mStr + birdVarNameArray[birdOrderArray[exprOrderArray[j]]]
      $("#explain_mc").find("#expr" + (j + 1) + "_txt").text(mStr);

      mStr = ""
			if (exprCoeffArray[j] > 1) {
				mStr = mStr + exprCoeffArray[j] + " x ("
			}
			mStr = mStr + birdCountArray[birdOrderArray[exprOrderArray[j]]]
			if (exprCoeffArray[j] > 1) {
				mStr = mStr + ")"
			}
      $("#explain_mc").find("#val" + (j + 1) + "_txt").text("" + mStr);

      $("#explain_mc").find("#expr" + (j + 1) + "_txt").show();
      $("#explain_mc").find("#val" + (j + 1) + "_txt").show();

      if (j > 0) {
        $("#explain_mc").find("#exprPlus" + j + "_mc").show();
        $("#explain_mc").find("#valPlus" + j + "_mc").show();
      }
    } else {
      $("#explain_mc").find("#expr" + (j + 1) + "_txt").hide();
      $("#explain_mc").find("#val" + (j + 1) + "_txt").hide();

      if (j > 0) {
        $("#explain_mc").find("#exprPlus" + j + "_mc").hide();
        $("#explain_mc").find("#valPlus" + j + "_mc").hide();
      }
    }
  }

  $("#explain_mc #answer_txt").text(valueOfExpr);
});

$("#explain_mc #closeIcon_mc").on("click", function () {
  $("#explain_mc").hide();
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
