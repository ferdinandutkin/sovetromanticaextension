console.log("романтично")




//TODO:: добавить включение-отключение. что-то сделать с фуллскрином
const to_inject = () => {
    console.log(window);
    console.log(player);



    function start() {

        const resume_data_serialized =  localStorage.getItem("resume_data");

        localStorage.clear();


        const resume_data = JSON.parse(resume_data_serialized);

        console.log(resume_data)


        const volume = resume_data?.volume ?? 0.5;
        const is_fullscreen = resume_data?.is_fullscreen ?? false;


        player.api("volume", volume)


        if (is_fullscreen) {


            player.api("fullscreen");


        }



        player.api("seek", 33);


        player.api("play")

    }




    function next() {
        const is_fullscreen = player.api("isfullscreen");
        const volume = player.api("volume");

        const resume_data = {
            is_fullscreen,
            volume
        }
        console.log(resume_data)

        const resume_data_serialized = JSON.stringify(resume_data)

        localStorage.setItem("resume_data", resume_data_serialized)



        goNext();
    }
    function tick() {

        let curTime = player.api('time');

        if (curTime >= skips[1].start) {
            next()



        }


    }


    start();
    document.getElementById("sovetromantica_player").addEventListener("time",  tick);

}


const to_iif = f => `(${f.toString()})()`

document.addEventListener("DOMContentLoaded", function(event) {
    const injection_string = to_iif(to_inject);

    const script = document.createElement("script");

    script.textContent = injection_string;
    document.head.appendChild(script);
});

