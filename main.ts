function GIRAR_VINGUENT_DARRERE () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, velocitat)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CW, velocitat)
    basic.pause(800)
    sonar2 = sonar.ping(
    DigitalPin.P12,
    DigitalPin.P13,
    PingUnit.Centimeters
    )
    if (sonar2 > 2 && sonar2 < 25) {
        enrere()
    }
    sentit_gir = randint(0, 1)
    if (sentit_gir == 0) {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, 127)
        motor.MotorRun(motor.Motors.M2, motor.Dir.CW, 127)
    } else {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 127)
        motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, 127)
    }
    temps_de_gir = randint(400, 1000)
    basic.pause(temps_de_gir)
    motor.motorStopAll()
    basic.pause(100)
    endavant()
}
function enrere () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, velocitat)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, velocitat)
    sensor_darrera_esquerra = pins.digitalReadPin(DigitalPin.P2)
    sensor_darrera_dret = pins.digitalReadPin(DigitalPin.P8)
    while (sensor_darrera_dret == 0 && sensor_darrera_esquerra == 0) {
        sensor_darrera_esquerra = pins.digitalReadPin(DigitalPin.P2)
        sensor_darrera_dret = pins.digitalReadPin(DigitalPin.P8)
    }
    motor.motorStopAll()
    GIRAR_VINGUENT_DARRERE()
}
function endavant () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, velocitat)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CW, velocitat)
    alerta = 0
    sensor_davant_dret = pins.digitalReadPin(DigitalPin.P0)
    sensor_davant_esquerra = pins.digitalReadPin(DigitalPin.P1)
    while (sensor_davant_dret == 0 && (sensor_davant_esquerra == 0 && alerta == 0)) {
        sensor_davant_esquerra = pins.digitalReadPin(DigitalPin.P0)
        sensor_davant_dret = pins.digitalReadPin(DigitalPin.P1)
        sonar2 = sonar.ping(
        DigitalPin.P12,
        DigitalPin.P13,
        PingUnit.Centimeters
        )
        if (sonar2 > 2 && sonar2 < 25) {
            alerta = 1
        }
    }
    if (sensor_davant_dret == 1 || sensor_davant_esquerra == 1) {
        motor.motorStopAll()
        GIRAR_VINGUENT_DAVANT()
    } else {
        motor.motorStopAll()
        enrere()
    }
}
function GIRAR_VINGUENT_DAVANT () {
    motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, velocitat)
    motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, velocitat)
    basic.pause(800)
    sentit_gir = randint(0, 1)
    if (sentit_gir == 0) {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 127)
        motor.MotorRun(motor.Motors.M2, motor.Dir.CCW, 127)
    } else {
        motor.MotorRun(motor.Motors.M1, motor.Dir.CCW, 127)
        motor.MotorRun(motor.Motors.M2, motor.Dir.CW, 127)
    }
    temps_de_gir = randint(400, 1000)
    basic.pause(temps_de_gir)
    motor.motorStopAll()
    basic.pause(100)
    endavant()
}
let sensor_davant_esquerra = 0
let sensor_davant_dret = 0
let alerta = 0
let sensor_darrera_dret = 0
let sensor_darrera_esquerra = 0
let temps_de_gir = 0
let sentit_gir = 0
let sonar2 = 0
let velocitat = 0
motor.motorStopAll()
basic.showLeds(`
    . . . . .
    . . . . .
    # . . . #
    . . . . .
    . . . . .
    `)
// Botó (A) activat=0
// Botó (B)
while (pins.digitalReadPin(DigitalPin.P5) == 1 && pins.digitalReadPin(DigitalPin.P11) == 1) {
	
}
basic.clearScreen()
led.plot(2, 2)
basic.pause(3000)
led.enable(false)
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
velocitat = 130
endavant()
