var Thread = Java.type("java.lang.Thread");
var intervalCount = [0, 1000];
var intervalOledLineNumber = [0, 7];
var uid = "x63"
var topic_prefix_bricklet_oled = "immonitor/bricklet/oled_128x64/" + uid;

function execute(action) {
    out("Test Script: " + action.getName());
    configureDisplay(false);
    configureDisplay(true);
    Thread.sleep(1000);
    configureDisplay(false);
    out("logging");

    while (true) {
        Thread.sleep(1000);
        clearDisplay();
        for (var i = 0; i < intervalCount[1]; i++) {
            var mappedLineNumber = mapIntervalValue(intervalCount, intervalOledLineNumber, i);
            writeLine(mappedLineNumber, i);
            Thread.sleep(50);
        }
    }
    action.setExitCode(0);
    action.setResultText("done.");
    out("Test Script: Done");
    return action;
}

function clearDisplay() {
    out("oled line clear");
    mqttManager.publish(topic_prefix_bricklet_oled + "/clear_display/set", "");
}

function configureDisplay(inverted) {
    var message = "{\"contrast\": 0,\"invert\":" + inverted + "}";
    mqttManager.publish(topic_prefix_bricklet_oled + "/display_configuration/set", message);
}

function writeLine(mappedLineNumber, count) {
    var message = "{\"line\": " + mappedLineNumber + ",\"position\": 0,\"text\": \"AWS event arrived: " + count + "\"}";
    mqttManager.publish(topic_prefix_bricklet_oled + "/write_line/set", message);
}

function out(message){
    output.print(message);
}

// Given a value from intervalA, returns a mapped value from intervalB.
function mapIntervalValue(intervalA, intervalB, valueIntervalA) {
    var valueIntervalB = (valueIntervalA - intervalA[0]) * (intervalB[1] - intervalB[0])
        / (intervalA[1] - intervalA[0]) + intervalB[0];

    valueIntervalB = Math.round(valueIntervalB); // Ommit rounding if not needed.
    return valueIntervalB;
}
