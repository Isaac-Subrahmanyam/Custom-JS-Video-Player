/**
Video Player Class Assignment from JW Player.
Author: Isaac Subrahmanyam

Goal:
    Make class as dynamic as possible.
    Make it where you can load any ammount of videos to any div you select:
        - Every video needs a unique id. Every video needs the same classes for styling.
        - In order todo this, we need to have a base id and a unique id.
        
Notes to employer:
    I know there is a lot of whitespace. But I wanted to make sure you understand how the code works.
    Especially regarding the videoplayer function.
    Also, the scrub bar sometimes acts up. I wasn't able to find an easy fix in time.
    I didn't have enough time to work on the extra credit due to exams.
    If due date is extended, I will be very happy to get the extra credit done!

**/

// keep track of total videos so we can create a unique id for each video
var totalVids = 0;

// class for player
class Player {
    constructor (divID, width, height) {
        
        // initial values of divID width and height
        this.divID_base = divID; // for loading videos into the div id selected
        this.divID = divID + "-" + "video" + totalVids; // create a unique id based off the div id
        this.width = width;
        this.height = height; 
        
        this.video;
        this.createVid;
        
        // add to total number of videos if contructed for id purposes
        totalVids ++;
    }
    
    // load video source
    load (url) {
        this.video.src = url;
    }
    
    // play and pause video functions
    play ()  { this.video.play(); }
    pause () { this.video.pause(); }
    
    // setters
    setVolume (volume)      { this.video.volume = volume / 100; }
    setMute (mute)          { this.video.muted = mute; }
    setAutoPlay (autoplay)  { this.video.autoplay = autoplay; this.video.load(); }
    resize (width, height)  { this.video.width = width; this.video.height = height; }
    
    setFullscreen () {    // request fullscreen for different browsers and enable   
        if (this.video.requestFullscreen)
            this.video.requestFullscreen();
        else if (this.video.mozRequestFullScreen)
            this.video.mozRequestFullScreen();
        else if (this.video.webkitRequestFullscreen)
            this.video.webkitRequestFullscreen();
        else if (this.video.msRequestFullscreen)
            this.video.msRequestFullscreen();
    }
    
    exitFullscreen () {    // request exit fullscreen for different browsers and enable   
        if (this.video.exitFullscreen)
            this.video.exitFullscreen();
        else if (this.video.msExitFullscreen)
            this.video.msExitFullscreen();
        else if (this.video.mozCancelFullScreen)
            this.video.mozCancelFullScreen();
        else if (this.video.webkitExitFullscreen)
            this.video.webkitExitFullscreen();
    }
    
    // getters
    getHeight ()        { return this.video.height; }
    getWidth ()         { return this.video.width; }
    getVolume ()        { return this.video.volume * 100; }
    getDuration ()      { return this.video.duration; }
    
    getPlaybackState () { // detect and get playback state
        if(this.video.ended)
            return "ended";
        if(!this.video.paused)
            return "playing";
        else if (this.video.paused)
            return "paused";
    }
    
    // button/br/emptyHeader/inputField creator functions for dynamically applying js controls to video
    // each have an InsertID which we can use to insert elements into different divs
    // each have a unique id for using each control on a specific video
    // each have general classes that aren't unique for css styling
    createButton (txt, id, insertID) { // create button for demonstration
        var btn = document.createElement("BUTTON");         // Create a <button> element
        btn.innerHTML = txt;                                // Insert text
        btn.setAttribute("id", this.divID + "-" + id);
        btn.setAttribute("class", id);
        document.getElementById(insertID).appendChild(btn); // Append <button> to <body>
    }
    createLineBR (insertID) {                               // enter out for next layer
        var lineBreak = document.createElement('br');
        document.getElementById(insertID).appendChild(lineBreak);
    }
    createH1 (id, insertID) {                               // create an empty h header
        var emptyH1Field = document.createElement("H");
        emptyH1Field.setAttribute("id", this.divID + "-" + id);
        emptyH1Field.setAttribute("class", id);
        document.getElementById(insertID).appendChild(emptyH1Field);
    }
    createInputField (id, initText, insertID) {             // create empty input field
        var inputField = document.createElement("INPUT");
        inputField.setAttribute("type", "text");
        inputField.setAttribute("id", this.divID + "-" + id);
        inputField.setAttribute("class", id);
        inputField.setAttribute("placeholder", initText);
        document.getElementById(insertID).appendChild(inputField);   
    }
    createInputSlider (id, insertID) {
        var inputField = document.createElement("INPUT");
        inputField.setAttribute("type", "range");
        inputField.setAttribute("name", "volume");
        inputField.setAttribute("id", this.divID + "-" + id);
        inputField.setAttribute("class", id);
        inputField.setAttribute("min", "0");
        inputField.setAttribute("max", "1");
        inputField.setAttribute("step", "0.05");
        inputField.setAttribute("value", "1");
        document.getElementById(insertID).appendChild(inputField);   
    }
    createDivField (id, insertID) {
        var div = document.createElement("div");
        div.setAttribute("id", this.divID + "-" + id);
        div.setAttribute("class", id);
        document.getElementById(insertID).appendChild(div);   
    }
    
    setupVideoPlayer (instance) {
        
        /** We need to make sure each video in the div is wrapped with it's own div so we can make multiple videos at once in one div **/
        this.createDivField("videoplayer", instance.divID_base);
        
        
        
        /* CREATE AND SETUP VIDEO */
        
        // create the video in the specified div id and make the video hold a unique id
        this.createVid = document.createElement('video'); // create the video element
        this.createVid.setAttribute("id", this.divID); // set it's unique id
        this.createVid.setAttribute("class", "vidplayformat"); // set it's unique id
        document.getElementById(this.divID + "-" + "videoplayer").appendChild(this.createVid);
        this.video = document.getElementById(this.divID); // set up the video to point to the video element

        // set width and height from constructor values
        this.video.width = this.width;
        this.video.height = this.height;
        
        
        /* CREATE AND SETUP CONTROLS BAR */
        
        // create controls in the player div which is in the container div
        this.createDivField("controls", this.divID + "-" + "videoplayer");
        
        // create div for bar
        this.createDivField("bar", this.divID + "-" + "controls");
        this.createDivField("bar-scroll", this.divID + "-" + "bar");
        
        // add buttons div to controls div
        this.createDivField("buttons", this.divID + "-" + "controls");
        
        
        
        /* CREATE PLAY PAUSE CONTROLS */
        
        // add buttons to buttons div
        this.createButton("", "play-pause", this.divID + "-" + "buttons");
        
        // toggles play/pause
        document.getElementById(this.divID + "-" + "play-pause").addEventListener("click", function() {
            
            // get the current playback state and use it to detemine what the play pause button does
            // 3 instances
            // (1) the video is paused - then play
            // (2) the video is played - then pause
            
            var getState = instance.getPlaybackState();
            
            if(getState === "paused")
            {
                instance.play();
                document.getElementById(instance.divID + "-" + "play-pause").className = 'pause';
            } else
            {
                instance.pause();
                document.getElementById(instance.divID + "-" + "play-pause").className = 'play';
            }
        });
        
        
        
        /* CREATE CURRENT TIME / DURATION */
        
        // create a div field for the timer
        this.createDivField("time", this.divID + "-" + "controls");
        
        // create current time / duration
        this.createH1("currentTime", this.divID + "-" + "time");
        this.createH1("divide", this.divID + "-" + "time");
        this.createH1("durationTime", this.divID + "-" + "time");
        
        // initialize both to 0:00
        document.getElementById(instance.divID + "-" + "currentTime").innerHTML = "0:00";
        document.getElementById(instance.divID + "-" + "divide").innerHTML = " / ";
        document.getElementById(instance.divID + "-" + "durationTime").innerHTML = "0:00";
        
        // setup timer to be 0:00 / 1:25 format based on video 
        this.video.addEventListener('timeupdate', function () {
            var currentMinutes = Math.floor(instance.video.currentTime / 60);
            var currentSeconds = Math.floor(instance.video.currentTime - currentMinutes * 60);
            var durationMinutes = Math.floor(instance.video.duration / 60);
            var durationSeconds = Math.floor(instance.video.duration - durationMinutes * 60);
            
            document.getElementById(instance.divID + "-" + "currentTime").innerHTML = currentMinutes + ":" + (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds);
            document.getElementById(instance.divID + "-" + "durationTime").innerHTML = durationMinutes + ":" + (durationSeconds < 10 ? '0' + durationSeconds : durationSeconds);
            
        });
        
        // show video time in bar format
        this.video.addEventListener('timeupdate', function() {
            
            var barPos = instance.video.currentTime / instance.video.duration;
            document.getElementById(instance.divID + "-" + "bar-scroll").style.width = barPos * 100 + "%";
            
            // set play/pause button to play once ended
            if(instance.ended)
                document.getElementById(instance.divID + "-" + "play-pause").className = 'play';
        });
        
        
        
        /* CREATE VIDEO SCRUBBER */
        
        // setup scrup
        function scrub (e) {
            const scrubTime = (e.offsetX / document.getElementById(instance.divID + "-" + "bar").offsetWidth) * instance.video.duration;
            instance.video.currentTime = scrubTime;
        }

        // if you click scrollbar change video time
        var mousedown = false;
        document.getElementById(this.divID + "-" + "bar").addEventListener("click", scrub);
        document.getElementById(this.divID + "-" + "bar").addEventListener('mousemove', (e) => mousedown && scrub(e));
        document.getElementById(this.divID + "-" + "bar").addEventListener('mousedown', () => mousedown = true);
        document.getElementById(this.divID + "-" + "bar").addEventListener('mouseup', () => mousedown = false);
        
        
        
        /* CREATE MUTE/UNMUTE CONTROLS */
        
        // toggle mute and unmute
        this.createDivField("buttons3", this.divID + "-" + "controls");
        this.createButton("", "muteunmute", this.divID + "-" + "buttons3");
        
        document.getElementById(this.divID + "-" + "muteunmute").addEventListener("click", function() {
            
            if(instance.video.muted)
            {
                instance.setMute(false);
                document.getElementById(instance.divID + "-" + "muteunmute").className = "unmute";
            } else 
            {
                instance.setMute(true);
                document.getElementById(instance.divID + "-" + "muteunmute").className = "mute";
            }
            
        });
        
        
        
        /* CREATE VOLUME SLIDER */
        
        // create the slider div
        this.createDivField("sliders", this.divID + "-" + "controls");
        this.createInputSlider("volumeslider", this.divID + "-" + "sliders");
        
        document.getElementById(this.divID + "-" + "volumeslider").oninput = function ()
        {    
            instance.video.volume = this.value;
            
            // mute or unmute depending on slider values upon input
            if(instance.video.volume <= 0)
            {
                instance.setMute(true);
                document.getElementById(instance.divID + "-" + "muteunmute").className = "mute";
            } else
            {
                instance.setMute(false);
                document.getElementById(instance.divID + "-" + "muteunmute").className = "unmute";
            }
        }
        
        
        /* CREATE FULLSCREEN/EXITFULLSCREEN CONTROLS */
        
        // create field and button toggles for fullscreen mechanics
        this.createDivField("buttons2", this.divID + "-" + "controls");
        this.createButton("", "full-reg-screen", this.divID + "-" + "buttons2");
        
        // toggles fullscreen and mimimise screen
        document.getElementById(this.divID + "-" + "full-reg-screen").addEventListener("click", function() {
            var getVidWrapper = document.getElementById(instance.divID + "-" + "videoplayer");
            
            if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
            {
                document.getElementById(instance.divID + "-" + "full-reg-screen").className = 'fullscreen';
                document.webkitExitFullscreen();
            } else
            {
                document.getElementById(instance.divID + "-" + "full-reg-screen").className = 'minimisescreen';
                getVidWrapper.webkitRequestFullscreen();
            }
        });
        
    }
    
    
    /** The Below code is for displaying the API demonstration **/
    
    // setup api demonstration
    setupDemonstration (instance) { // setup layout
        
        /** Since this is a demonstration, I don't need to worry about making sure each demonstration is wrapped around a seperate video div id**/
        
        // create the video in the specified div id and make the video hold a unique id
        this.createLineBR(instance.divID_base); // enter our for formatting
        this.createVid = document.createElement('video'); // create the video element
        this.createVid.setAttribute("id", this.divID); // set it's unique id
        document.getElementById(this.divID_base).appendChild(this.createVid);
        this.createLineBR(instance.divID_base); // enter out for formatting
        this.video = document.getElementById(this.divID); // set up the video to point to the video element
        
        // set width and height from constructor values
        this.video.width = this.width;
        this.video.height = this.height;
        
        // setup some video attributes to better demonstrate api
        this.createVid.setAttribute("style", "object-fit: cover;");
        this.createVid.setAttribute("controls", "");
        
        /* first layer (general video buttons play/pause/mute/unmute/fulscreen) */
        
        // create each button
        this.createButton("Play", "play", instance.divID_base); // play button
        this.createButton("Pause", "pause", instance.divID_base); // puase button
        this.createButton("Mute", "mute", instance.divID_base); // mute button
        this.createButton("Unmute", "unmute", instance.divID_base); // unmute button
        this.createButton("Fullscreen", "fullscreen", instance.divID_base); // fullscreen
        this.createLineBR(instance.divID_base); // enter it out for formatting
        
        // set each button's functionality
        document.getElementById(this.divID + "-" + "play").addEventListener("click", function() {
            instance.play(); // play
        });
        document.getElementById(this.divID + "-" + "pause").addEventListener("click", function() {
            instance.pause(); // puase
        });
        document.getElementById(this.divID + "-" + "mute").addEventListener("click", function() {
            instance.setMute(true); // set mute
        });
        document.getElementById(this.divID + "-" + "unmute").addEventListener("click", function() {
            instance.setMute(false); // set unmute
        });
        document.getElementById(this.divID + "-" + "fullscreen").addEventListener("click", function() {
            instance.setFullscreen(); // set fullscreen
        });
        
        /* second layer (enable and disable autoplay) */
        
        // create buttons
        this.createButton("Enable Autoplay", "enableAutoplay", instance.divID_base); // enable autoplay button
        this.createButton("Disable Autoplay", "disableAutoplay", instance.divID_base); // disable autoplay button
        this.createLineBR(instance.divID_base); // enter out for formatting
        
        // set the buttons functionality
        document.getElementById(this.divID + "-" + "enableAutoplay").addEventListener("click", function() {
            instance.setAutoPlay(true); // set autoplay to true
        });
        document.getElementById(this.divID + "-" + "disableAutoplay").addEventListener("click", function() {
            instance.setAutoPlay(false); // set autoplay to false
        });
        
        /* third layer (getters as assigned in homework) */
        
        // display buttons
        this.createButton("Get Width:", "getw", instance.divID_base); // get width button and showcase value
        this.createH1("widthValue", instance.divID_base); 
        this.createButton("Get Height:", "geth", instance.divID_base); // get height button and showcase value
        this.createH1("heightValue", instance.divID_base);
        this.createButton("Get Volume:", "getv", instance.divID_base); // get volume button and showcase value
        this.createH1("volumeValue", instance.divID_base);
        this.createButton("Get Duration:", "getd", instance.divID_base); // get duration button and showcase value
        this.createH1("durationValue", instance.divID_base);
        this.createButton("Get Playback State:", "getp", instance.divID_base); // get playback state button and showcase value
        this.createH1("playbackValue", instance.divID_base);
        this.createLineBR(instance.divID_base);
        
        // display getter values once buttons are clicked
        document.getElementById(this.divID + "-" + "getw").addEventListener("click", function() {
            document.getElementById(instance.divID + "-" + "widthValue").innerHTML = instance.getWidth();
        });
        document.getElementById(this.divID + "-" + "geth").addEventListener("click", function() {
            document.getElementById(instance.divID + "-" + "heightValue").textContent = instance.getHeight();
        });
        document.getElementById(this.divID + "-" + "getv").addEventListener("click", function() {
            document.getElementById(instance.divID + "-" + "volumeValue").textContent = instance.getVolume();
        });
        document.getElementById(this.divID + "-" + "getd").addEventListener("click", function() {
            document.getElementById(instance.divID + "-" + "durationValue").textContent = instance.getDuration();
        });
        document.getElementById(this.divID + "-" + "getp").addEventListener("click", function() {
            document.getElementById(instance.divID + "-" + "playbackValue").textContent = instance.getPlaybackState();
        });
        
        /* Fourth layer (input fields and button for resizing video) */
        this.createInputField("resizeWidth", "Width", instance.divID_base);
        this.createInputField("resizeHeight", "Height", instance.divID_base);
        this.createButton("Resize", "resizeButton", instance.divID_base);
        this.createLineBR(instance.divID_base);
        document.getElementById(this.divID + "-" + "resizeButton").addEventListener("click", function() {
            
            var width = document.getElementById(instance.divID + "-" + "resizeWidth").value;
            var height = document.getElementById(instance.divID + "-" + "resizeHeight").value;
            
            if (width !== "" && height !== "")
                instance.resize(width, height);
        });
        
        /* Fifth layer (input field and button for setting volume) */
        this.createInputField("volumeLevel", "Volume level", instance.divID_base);
        this.createButton("Set Volume", "setVolButton", instance.divID_base);
        document.getElementById(this.divID + "-" + "setVolButton").addEventListener("click", function() {
            
            var volumeLevel = document.getElementById(instance.divID + "-" + "volumeLevel").value;
            
            if(volumeLevel !== "")
               instance.setVolume(volumeLevel);
        });
        
    }
}