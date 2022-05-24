var ActivityMain = (function () {
    W_Array = [
        `<li class="cylinder W_01"><div class="item W_01"><img src="assets/images/W_01.svg" /><span class="data-label">D</span></div></li>`,
        `<li class="cylinder W_02"><div class="item W_02"><img src="assets/images/W_02.svg" /><span class="data-label">A</span></div></li>`,
        `<li class="cylinder W_03"><div class="item W_03"><img src="assets/images/W_03.svg" /><span class="data-label">B</span></div></li>`,
        `<li class="cylinder W_04"><div class="item W_04"><img src="assets/images/W_04.svg" /><span class="data-label">C</span></div></li>`,
        `<li class="cylinder W_05"><div class="item W_05"><img src="assets/images/W_05.svg" /><span class="data-label">E</span></div></li>`,
        `<li class="cylinder W_06"><div class="item W_06"><img src="assets/images/W_06.svg" /><span class="data-label">F</span></div></li>`
    ];
    Data_Array = [
        "D", "A", "B", "C", "F", "E"
    ];
    TemperatureArray = [];

    return {
        LaunchActivity: function () {
            this.ResetCylinders();
            this.BindJQueryUIMethods();
        },
        ResetActivity: function () {
            var orgtop = $(".thermometer").data('orgTop');
            var orgleft = $(".thermometer").data('orgLeft');
            $(".thermometer").css({
                "left": orgleft,
                "top": orgtop
            })
            this.ResetCylinders();
            this.BindJQueryUIMethods();
            ActivityMain.InitReadingCounter(Number($(".thermoreading").text()), 25, Number($(".thermoreading").text()));

            $(".editableTextPad").val("")
            $(".wrong_mc").hide();
            $(".correct_mc").hide();
        },
        OnOrientationChange: function () {
        },
        BindJQueryUIMethods: function () {
            //Bind Sortable
            $("#cylinder-list").sortable()
                .disableSelection();

            //Bind Draggable
            $(".thermometer").draggable({
                //revert: "invalid",
                revert: function (event, ui) {
                    $(this).data("uiDraggable").originalPosition = {
                        top: $(this).data('orgTop'),
                        left: $(this).data('orgLeft')
                    };
                    /*
                    if (!event) {
                        ActivityMain.InitReadingCounter(Number($(".thermoreading").text()), 25, Number($(".thermoreading").text()));
                    }*/
                    return !event;
                }
            }).each(function () {
                var top = $(this).position().top;
                var left = $(this).position().left;
                $(this).data('orgTop', top);
                $(this).data('orgLeft', left);
            });

            //Bind Droppable
            $("li.cylinder .item").droppable({
                accept: ".thermometer",
                tolerance: "touch",
                drop: function (event, ui) {
                    var t_to = $(event.target).closest("li.cylinder").attr("temperature")
                    t_to = Number(t_to)
                    ActivityMain.InitReadingCounter(25, t_to, 25);
                },
                out: function (event, ui) {
                    ActivityMain.InitReadingCounter(Number($(".thermoreading").text()), 25, Number($(".thermoreading").text()));
                }
            });
        },
        ResetCylinders: function () {
            var locWArray = this.Shuffle(W_Array);
            $("#cylinder-list").empty();
            var locDataArray = this.Shuffle(Data_Array)
            var temperatures = [];
            for (var i = 0; i < locWArray.length; i++) {
                temperatures.push(Number((30 + 11 * i + Number(7 * Math.random())).toFixed(0)))
            }
            temperatures = this.Shuffle(temperatures);
            TemperatureArray = [];
            for (var i = 0; i < locWArray.length; i++) {
                temperature = (30 + 11 * i + Number(7 * Math.random()))
                var locCylinder = $(locWArray[i]).attr("temperature", temperatures[i]).attr("datalabel", locDataArray[i]);
                TemperatureArray.push({ label: locDataArray[i], temperature: temperatures[i] })
                locCylinder.find(".data-label").text(locDataArray[i]);
                $("#cylinder-list").append(locCylinder);
            }
            TemperatureArray.sort((a, b) => a.temperature - b.temperature);
            TemperatureArray.reverse();
            console.log(TemperatureArray);
        },
        Shuffle: function (array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
            return array;
        },
        InitReadingCounter: function (p_from, p_to, p_current) {
            clearInterval(ThermoReadingInterval);
            ThermoReading = {
                from: p_from,
                to: p_to,
                current: p_current,
            }
            if (p_from < p_to) {
                AnnimateIncreaseInReading();
            }
            else {
                AnnimateDecreaseInReading();
            }
        },
        SubmitActivity: function(){
            var result = []
            $("#cylinder-list li.cylinder").each(function( index ) {
                //console.log( index + ": " + $( this ).text() );
                result.push({"label": $(this).attr("datalabel"),"temperature": Number($(this).attr("temperature"))})
            });
            console.log(result)
            if(JSON.stringify(result)==JSON.stringify(TemperatureArray)){
                $(".wrong_mc").hide();
                $(".correct_mc").show();
            }
            else{
                $(".wrong_mc").show();
                $(".correct_mc").hide();
            }
        },
        AnswerActivity: function(){

        }
    };
})();

var ThermoReadingInterval = null;
var ThermoReading = {
    from: 25,
    to: 100,
    current: 25,
}
function AnnimateIncreaseInReading() {
    ThermoReadingInterval = setInterval(function () {
        ThermoReading.current = ThermoReading.current + 1;
        $(".thermored").css({ "height": ThermoReading.current + "%" })
        if (ThermoReading.current >= ThermoReading.to) {
            clearInterval(ThermoReadingInterval);
            $(".thermoreading").text(ThermoReading.to)
            DisplayTemperatureBar(ThermoReading.to);
        }
        else {
            $(".thermoreading").text(ThermoReading.current)
            DisplayTemperatureBar(ThermoReading.current);
        }
    }, 10)
}

function AnnimateDecreaseInReading() {
    ThermoReadingInterval = setInterval(function () {
        ThermoReading.current = ThermoReading.current - 1;
        if (ThermoReading.current <= ThermoReading.to) {
            clearInterval(ThermoReadingInterval);
            $(".thermoreading").text(ThermoReading.to)
            DisplayTemperatureBar(ThermoReading.to);
        }
        else {
            $(".thermoreading").text(ThermoReading.current)
            DisplayTemperatureBar(ThermoReading.current);
        }
    }, 5)
}

function DisplayTemperatureBar(currPerc) {
    var deltaPerc = (currPerc / 10.0) - 1
    var perc = currPerc - deltaPerc;
    console.log(currPerc + " : " + deltaPerc + " : " + perc)
    $(".thermored").css({ "height": perc + "%" })
}

$(document).on("click", "#btn_reset", function (event) {
    ActivityMain.ResetActivity();
});
$(document).on("click", "#btn_ok", function (event) {
    ActivityMain.SubmitActivity();
});
$(document).on("click", "#btn_answer", function (event) {
    ActivityMain.AnswerActivity();
    bubbleSort();
});



const container = document.querySelector(".cylinder-list");
/*
function generateBlocks(num = 20) {
  if (num && typeof num !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < num; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}
*/
function swap(el1, el2) {
  return new Promise(resolve => {
    //const style1 = window.getComputedStyle(el1);
    //const style2 = window.getComputedStyle(el2);

    //const transform1 = style1.getPropertyValue("transform");
    //const transform2 = style2.getPropertyValue("transform");

    //el1.style.transform = transform2;
    //el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}

async function bubbleSort(delay = 100) {
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  let blocks = document.querySelectorAll(".cylinder");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      //blocks[j].style.backgroundColor = "#FF4949";
      //blocks[j + 1].style.backgroundColor = "#FF4949";

      await new Promise(resolve =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].getAttribute('temperature'));
      const value2 = Number(blocks[j + 1].getAttribute('temperature'));

      if (value2 > value1) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".cylinder");
      }

      //blocks[j].style.backgroundColor = "#58B7FF";
      //blocks[j + 1].style.backgroundColor = "#58B7FF";
    }

    //blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
  }
}

//generateBlocks();
//bubbleSort();

