// tag : filepath
const GAME_AUDIO = [
    {tag: "Test", filePath: "./assets/audio/Victory.wav"}, 
];

/**
 * A facade for easier use of the audio system, not a game entity, must persist between levels
 */
class AudioManager{
    constructor(assetManager){
        this.assetManager = assetManager;
        this.audioMap = new Map();
        this.globalVolume = 0.5;
        this.initalized = false; // web browsers dont allow auto playing of sounds, need to wait for specific events
        this.assetManager.adjustVolume(this.globalVolume);
    }

    /** Awaits initialization from the canvas, callback is for when it's completely initialized */
    awaitInitialize(canvas, callback){

        canvas.addEventListener("click", () => {
            init(callback, this);
        });

        canvas.addEventListener("mousedown", () => {
            init(callback, this);
        });

        canvas.addEventListener("mouseup", () =>  {
            init(callback, this);
        });

        canvas.addEventListener("keydown", () =>  {
            init(callback, this);
        });

        function init(callback, that){

            if(that.initalized === true){
                return; // already initialized
            }

            that.initalized = true;
            callback(); // when the music is done
        };
    }

    /** Adds music with tag and filepath to the manager */
    addAudio(tag, filePath){

        this.audioMap.set(tag, filePath);
    }

    /** Plays once then stops */
    playOnce(tag){

        if(!this.initalized){
            console.warn("Audio Manager is not initialized!");
            return;
        }

        if(!this.audioMap.has(tag)){
            console.warn("Tag: " + tag + " not in AudioManager");
            return;
        }

        this.assetManager.playAsset(this.audioMap.get(tag)); // plan once
    }

    /** plays audio looped */
    playLooped(tag){
        if(!this.initalized){
            return;
        }

        if(!this.audioMap.has(tag)){
            console.warn("Tag: " + tag + " not in AudioManager");
            return;
        }

        this.assetManager.autoRepeat(this.audioMap.get(tag)); // set to looping
        this.assetManager.playAsset(this.audioMap.get(tag)); // play
    }

    /** Sets the muted status of all audio */
    setMuted(isMuted = true){
        if(!this.initalized){
            return;
        }

        this.assetManager.muteAudio(isMuted); 
    }

    adjustVolume(volume){
        if(volume < 0 || volume > 1){
            console.warn("Volume must be betwee 0 and 1! It was: " + volume);
            return;
        }

        this.globalVolume = volume;
        this.assetManager.adjustVolume(this.globalVolume);
    }
}

function addAllMusic(audioManager){
    
    if(GAME_AUDIO ===null || GAME_AUDIO === undefined || GAME_AUDIO.length < 1){ return;}

    for (let i = 0; i < GAME_AUDIO.length; i++) {
        const audio = GAME_AUDIO[i];

        audioManager.addAudio(audio.tag, audio.filePath);
        
    }
}