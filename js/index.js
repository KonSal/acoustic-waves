$(document).ready(function() {
  // Function that plays the tone.
  var playTone = function(duration, frequency, difference) {

    duration = Number(duration);
    frequency = Number(frequency);
    difference = Number(difference);

    var context = new(window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator();
    // Sine is the default type. Also available: square, sawtooth and triangle waveforms.
    osc.type = 'sine';
    var now = context.currentTime;
    // Frequency in Hz.
    osc.frequency.setValueAtTime(frequency, now);
    // set a "checkpoint" in 3 seconds - that will be the starting point of the ramp.
    osc.frequency.setValueAtTime(frequency, now + duration / 3);
    // set a ramp to freq+100Hz over the next 4 seconds.
    osc.frequency.linearRampToValueAtTime(frequency + difference, now + duration);
    osc.connect(context.destination);
    osc.start(now);
    osc.stop(now + duration);
  };

  // Option dropdown functionality
  var option = "";
  $("#single").on("click", function() {
    $("#dropdownMenu").html("Single");
    option = "single";
    $("#f2").attr("disabled", true);
    $("#diff2").attr("disabled", true);
  });
  $("#mixture").on("click", function() {
    $("#dropdownMenu").html("Mixture");
    option = "mixture";
    $("#f2").removeAttr("disabled");
    $("#diff2").removeAttr("disabled");
  });

  // Button and input functionality.
  $("#playButton").on("click", function() {

    var duration = document.getElementById("durationInput").value;
    var frequency = document.getElementById("f1").value;
    var difference = document.getElementById("diff1").value;
    var frequency2 = document.getElementById("f2").value;
    var difference2 = document.getElementById("diff2").value;

    if (option === "single") {
      playTone(duration, frequency, difference);
    } else if (option === "mixture") {
      playTone(duration, frequency, difference);
      playTone(duration, frequency2, difference2);
    } else {
      alert("Pick an option!");
    }

  });

});