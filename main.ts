enum RadioMessage {
    message1 = 49434,
    cr = 22793,
    StopAlarm = 45482
}
let state = 0
radio.onReceivedMessage(RadioMessage.cr, function () {
    state = 4
})
input.onButtonPressed(Button.A, function () {
    if (state == 1) {
        led.stopAnimation()
        state = 2
    } else if (state == 2) {
        led.stopAnimation()
        state = 0
        radio.sendMessage(RadioMessage.StopAlarm)
    }
})
radio.onReceivedMessage(RadioMessage.StopAlarm, function () {
    state = 0
})
function CodeRed () {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    music.playMelody("F F G G F F G G ", 120)
}
input.onButtonPressed(Button.AB, function () {
    if (state == 3) {
        led.stopAnimation()
        state = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (state == 2) {
        led.stopAnimation()
        state = 1
    } else if (state == 1) {
        state = 3
        basic.showString("I Am Calling the Police, RUN....")
    }
})
basic.forever(function () {
    if (state == 0) {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            # . # . #
            . # # # .
            `)
        if (input.soundLevel() >= 150) {
            state = 1
        }
    } else if (state == 1) {
        radio.sendMessage(RadioMessage.cr)
        CodeRed()
    } else if (state == 2) {
        basic.showString("You want to stop Alarm")
    } else if (state == 3) {
    	
    } else if (state == 4) {
        CodeRed()
    } else {
    	
    }
})
