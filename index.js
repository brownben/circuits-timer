'use strict'

// Set up Initial State for App
let state = {
    noOfActivities: 8,
    lenOfActivities: 25,
    lenOfRests: 10,
    currentScreen: '',
}

// Define the Buzzer (Web Audio API)
// If API not Avaliable
let audioContext = new (window.AudioContext || window.webkitAudioContext || false)()
if (!audioContext) document.getElementById('sound-error').setAttribute('style', 'display:block')

let oscillator = audioContext.createOscillator()
oscillator.type = 'triangle'
oscillator.frequency.value = 400
let gain = audioContext.createGain()
oscillator.connect(gain)
gain.connect(audioContext.destination)
gain.gain.value = 0
oscillator.start(0.0)

function tone (length) {
    gain.gain.linearRampToValueAtTime(1, audioContext.currentTime)
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + length)
}

function delay (length) {
    return new Promise(function (resolve) {
        setTimeout(resolve, length * 1000)
    })
}

function playTone (length) {
    tone(length)
    return delay(length)
}

// Countdown
function countdown (length) {
    document.getElementById('countdown').innerText = ''
    return counterReduce(length)
        .then((a) => {
            if (a === 0) return new Promise(function (resolve) { resolve(a) })
        })
}

function counterReduce (counter) {
    return delay(1)
        .then(() => {
            document.getElementById('countdown').innerText = counter
            if (counter === 0) return new Promise(function (resolve) { resolve(0) })
            else return counterReduce(counter - 1)
        })
}

// Update State and Set Values for Time
function updateNoOfActivities () {
    document.getElementById('noOfActivities_value').innerText = state.noOfActivities
}

function updateLengthOfActivities () {
    document.getElementById('lenOfActivities_value').innerText = state.lenOfActivities
}

function updateLengthOfRests () {
    document.getElementById('lenOfRests_value').innerText = state.lenOfRests
}

function changeNoOfActivities (value) {
    if (state.noOfActivities > 1 || value > 0) {
        state.noOfActivities += value
        updateNoOfActivities()
    }
}

function changeLengthOfActivities (value) {
    if (state.lenOfActivities > 1 || value > 0) {
        state.lenOfActivities += value
        updateLengthOfActivities()
    }
}

function changeLengthOfRests (value) {
    if (state.lenOfRests > 1 || value > 0) {
        state.lenOfRests += value
        updateLengthOfRests()
    }
}

// Toggle between the Running and the Config Screen
function changeScreen () {
    red()
    if (state.currentScreen === 'config') {
        document.getElementById('start').innerText = 'Stop'
        document.getElementById('config').setAttribute('style', 'display:none')
        document.getElementById('timer').setAttribute('style', 'display:block')
        state.currentScreen = 'timer'
        return 'start'
    }
    else {
        document.getElementById('start').innerText = 'Start'
        document.getElementById('config').setAttribute('style', 'display:block')
        document.getElementById('timer').setAttribute('style', 'display:none')
        state.currentScreen = 'config'
        return 'stop'
    }
}

// Start
function start () {
    if (changeScreen() === 'start') {
        state.activitiesRemaining = state.noOfActivities - 1
        activity()
    }
}

// Set actions happening
function activity () {
    if (state.currentScreen === 'timer') {
        playTone(1)
            .then(() => {
                if (state.currentScreen === 'timer') {
                    green()
                    return countdown(state.lenOfActivities)
                }
            })
            .then(() => {
                if (state.currentScreen === 'timer') {
                    playTone(1)
                }
            })
            .then(() => {
                if (state.currentScreen === 'timer') {
                    red()
                    return countdown(state.lenOfRests)
                }
            })
            .then(() => {
                if (state.currentScreen === 'timer') {
                    state.activitiesRemaining -= 1
                    if (state.activitiesRemaining >= 0) activity()
                    else {
                        playTone(1)
                        changeScreen()
                    }
                }
            })
    }
}

// Change color of Background Depending on what Zone is currently running
function green () {
    document.getElementById('body').setAttribute('style', 'background-color:#00C853')
    document.getElementById('current-state').innerText = 'Activity'
}

function red () {
    document.getElementById('body').setAttribute('style', 'background-color:#F44336')
    document.getElementById('current-state').innerText = 'Rest'
}

// Apply State to UI
changeScreen()
updateNoOfActivities()
updateLengthOfActivities()
updateLengthOfRests()
