'use strict'

// Set up Initial State for App
let state = {
    noOfActivities: 8,
    lenOfActivities: 25,
    lenOfRests: 15,
    currentScreen: 'config',
}
document.getElementById('start').innerText = 'Start'
document.getElementById('config').setAttribute('style', 'display:block')
document.getElementById('timer').setAttribute('style', 'display:none')

// Define the Buzzer (Web Audio API)
// If API not Avaliable
let audioContext = new (window.AudioContext || window.webkitAudioContext || false)()
if (!audioContext) {
    document.getElementById('sound-error').setAttribute('style', 'display:block')
}

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
    state.noOfActivities += value
    updateNoOfActivities()
}

function changeLengthOfActivities (value) {
    state.lenOfActivities += value
    updateLengthOfActivities()
}

function changeLengthOfRests (value) {
    state.lenOfRests += value
    updateLengthOfRests()
}
