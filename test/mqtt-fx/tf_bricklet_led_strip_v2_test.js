var Thread = Java.type("java.lang.Thread");
var uid = "FSv"
var topic_prefix_bricklet_strip_v2 = "tinker-dev/bricklet/led_strip_v2/" + uid;
var frameDuration = 100; // milliseconds
var numberOfPixels = 3;

// setting a strip of 3 Pixels with RGB mapping: { "index": 0, "value": [30,0,0,0,30,0,0,0,30]}

function execute(action) {
    out("Test Script: " + action.getName());
    configureStrip(frameDuration);
    clearStrip();
    Thread.sleep(1000);

    var off = "0,0,0";
    var red = "255,0,0";
    var colorMap1 = red + "," + off + "," + off;
    var colorMap2 = off + "," + red + "," + off;
    var colorMap3 = off + "," + off + "," + red;
    var colorMapIndex = 0;
    while (true) {
       Thread.sleep(frameDuration);

       if (colorMapIndex == 0) {
         writeStrip(colorMap1);
         colorMapIndex += 1;
       } else if (colorMapIndex == 1) {
         writeStrip(colorMap2);
         colorMapIndex += 1;
       } else if (colorMapIndex == 2) {
         writeStrip(colorMap3);
         colorMapIndex += 1;
       } else if (colorMapIndex == 3) {
         writeStrip(colorMap2);
         colorMapIndex = 0;
       }
/*
        for (var i = 0; i < 255; i++) {
          var mappedColor = i + "," + i + "," + i;
          var colorMap = mappedColor + "," + mappedColor + "," + mappedColor;
          writeStrip(colorMap);
          Thread.sleep(50);
        }
*/
    }
    action.setExitCode(0);
    action.setResultText("done.");
    out("Test Script: Done");
    return action;
}

function clearStrip() {
    out("strip clear");
    mqttManager.publish(topic_prefix_bricklet_strip_v2 + "/led_values/set", "{\"index\": 0, \"value\": [0,0,0,0,0,0,0,0,0]}");
}

function configureStrip(frameDuration) {
    var message = "{\"frame_duration\": " + frameDuration + "}";
    mqttManager.publish(topic_prefix_bricklet_strip_v2 + "/frame_duration/set", message);
}

function writeStrip(colorMap) {
    var message = "{\"index\": 0, \"value\": [" + colorMap + "]}";
    mqttManager.publish(topic_prefix_bricklet_strip_v2 + "/led_values/set", message);
}

function out(message){
    output.print(message);
}
