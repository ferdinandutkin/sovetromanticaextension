


console.log("романтично")




//TODO:: что-то сделать с фуллскрином
const to_inject = settings => {


    const { skip_intro, autoplay_next,skip_opening_with_hotkey, skip_opening_hotkey} = settings;



    console.log(settings);

    class api_wrapper {
        #wrapped
        constructor() {
            this.#wrapped = player;
        }

        get is_fullscreen() {
            return this.#wrapped.api("isfullscreen");
        }

        set is_fullscreen(val) {
            if (val === true) {
                this.#wrapped.api("fullscreen");
            }
            else if (val === false) {
                this.#wrapped.api("exitfullscreen");
            }

        }

        get volume() {
            return this.#wrapped.api("volume");
        }

        set volume(val) {
            this.#wrapped.api("volume", val);
        }

        play() {
            this.#wrapped.api("play");
        }

        get current_time() {
            return this.#wrapped.api('time')
        }

        set current_time(val) {
            this.#wrapped.api("seek", val);
        }

        go_next() {
            goNext();
        }


    }

    const wrapper = new api_wrapper();

    const start = () => {

        const resume_data_serialized =  localStorage.getItem("resume_data");

        localStorage.clear();


        const resume_data = JSON.parse(resume_data_serialized);

        console.log(resume_data)


        const volume = resume_data?.volume ?? 0.5;
        const is_fullscreen = resume_data?.is_fullscreen ?? false;


        wrapper.volume = volume;

        wrapper.is_fullscreen = is_fullscreen;


        if (skip_intro) {
            wrapper.current_time = 33.2;
        }


        wrapper.play();


    }





    const next = () => {
        const is_fullscreen = wrapper.is_fullscreen;
        const volume = wrapper.volume;

        const resume_data = {
            is_fullscreen,
            volume
        }
        console.log(resume_data)

        const resume_data_serialized = JSON.stringify(resume_data)

        localStorage.setItem("resume_data", resume_data_serialized)
        wrapper.go_next();

    }

    const time_handler = () => {
        const time = wrapper.current_time;
        if (time >= skips[1].start) {
            next();
        }
    }

    const keydown_handler = ev => {
        console.log(ev);
        if (ev.code === "KeyS") {

            console.log("keyS")
            const time = wrapper.current_time;

            if (time <= skips[0].skip_to) {
                console.log('skip');
                wrapper.current_time = skips[0].skip_to;
            }
        }
    }

    const init_listeners = () => {
        const player_element = document.getElementById("sovetromantica_player");


        if (autoplay_next) {
            player_element.addEventListener("time",  time_handler);
        }


        if (skip_opening_with_hotkey) {
            document.body.addEventListener("keydown", keydown_handler);
        }

    }

    init_listeners();

    start();


}


const to_iif = (func, ...args) => `(${func.toString()}).apply(null, ${JSON.stringify(args)})`


let settings = {
    skip_intro: undefined,
    autoplay_next : undefined,

    skip_opening_with_hotkey : undefined,
    skip_opening_hotkey : "KeyS"
}


chrome.storage.sync.get(["skip_intro", "autoplay_next", "skip_opening_with_hotkey"], result => {

    for (let key in result) {
        settings[key] = result[key] ?? true;
    }

    console.log('result', result)

    document.addEventListener("DOMContentLoaded", () => {
        const injection_string = to_iif(to_inject, settings);

        const script = document.createElement("script");


        script.textContent = injection_string;
        document.head.appendChild(script);
    });
});



