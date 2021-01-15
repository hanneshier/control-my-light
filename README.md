# control-my-light
simple website to control my [home assistant](https://www.home-assistant.io) enabled lights

## why
well... i set down to study the other day, but then I stumbled about this [reddit post](https://www.reddit.com/r/IRLEasterEggs/comments/kwr1sz/i_have_this_qr_code_sitting_behind_me_in_zoom/?utm_source=share&utm_medium=web2x&context=3), so now people can randomly change the color of the lights in my room

## architecture
 i created a small node.js webserver that provides the current rgba values, that a home assistant rest sensor can just check every few seconds or so. no port forwarding, nobody gets into my network, i can just locally disable the ha-automation and have my peace again, without people tempering with my lights anymore