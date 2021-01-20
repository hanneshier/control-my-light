# control-my-light
simple website to control my [home assistant](https://www.home-assistant.io) enabled lights

## why
well... i set down to study the other day, but then I stumbled about this [reddit post](https://www.reddit.com/r/IRLEasterEggs/comments/kwr1sz/i_have_this_qr_code_sitting_behind_me_in_zoom/?utm_source=share&utm_medium=web2x&context=3), so now people can randomly change the color of the lights in my room

## architecture
 i created a small node.js webserver that provides the current rgba values, that a home assistant rest sensor can just check every few seconds or so. no port forwarding, nobody gets into my network, i can just locally disable the ha-automation and have my peace again, without people tempering with my lights anymore

 # how to use
 ## server
 if you use a setup [similiar to mine](https://blog.hieronimi.xyz/nginx-reverse-proxy/), where you host multiple websites on an vps behind an ssl enabled nginx reverse proxy inside a docker container, you just need to adjust the environment variables in the docker-compose.yml file. then build with `docker-compose build` and start the container with `docker-compose up -d`. if you use another setup, it shouldn't be hard to adjust the docker-compose.yml accordingly or directly run the node.js server. 

 ## development
 just type `npm start` and you will find the server on localhost/

 ## home assistant
 Just add the following rest sensor to your home assistant configuration.yaml. don't forget to change the url to you own server.
 ```
 sensor:
   - platform: rest
    name: changemylight
    resource: "https://example.com/color/"
    scan_interval: 5
```
you can adjust the scan_interval according to how fast and often you want to change your colors. home assistant will just take the value from the last person that changed it, all other changes will not be stored

then add an automation like this:
```
alias: change my light
description: ''
trigger:
  - platform: state
    entity_id: sensor.changemylight
condition: []
action:
  - service: light.turn_on
    data_template:
      entity_id: light.your_light
      rgb_color:
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.r}}
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.g}}
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.b}}
      brightness: '{% set light = states("sensor.changemylight") | from_json %}{{light.a}}'
  - service: light.turn_on
    data_template:
      entity_id: light.your_second_light
      rgb_color:
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.r}}
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.g}}
        - >-
          {% set light = states("sensor.changemylight") | from_json
          %}{{light.b}}
      brightness: '{% set light = states("sensor.changemylight") | from_json %}{{light.a}}'
mode: restart
```
you can add as many lights as you want in the action section