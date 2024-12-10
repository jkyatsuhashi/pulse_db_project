export default function Dashboard() {
    return (
        <>
         {/* Reference Code for the Slider(s) https://github.com/mintpw/infinite-horizontal-scroll-pause-hover/tree/main*/}
            <style>
                {`
                    *,
                    *::after,
                    *::before {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        box-sizing: border-box;
                        overflow: hidden;
                    }

                    body {
                        font-family: 'Arial', sans-serif;
                        font-size: 16px;
                        background-color: #f5f5f5;
                        color: #333;
                    }

                    .dashboard-container {
                        background-image: url("https://archive.org/download/pulse_background/pulse_background.jpg");
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                        padding-top: 50px;
                        color: white;
                        text-align: center;
                    }

                    h3 {
                        text-align: left;
                        margin-left: 20px; /* Optional: Adds space from the left edge */
                    }

                    .scroll-container {
                        height: 250px;
                        width: 100%;
                        overflow: hidden;
                        position: relative;
                        margin-top: 30px;
                    }

                    .carousel {
                        display: flex;
                        flex-wrap: nowrap;
                        animation: scroll-horizontal 20s linear infinite; /* Adjust the speed */
                    }

                    .carousel img {
                        width: 300px;
                        height: 200px;
                        margin-left: 20px;
                        border-radius: 14px;
                        object-fit: cover;
                    }

                    .carousel-primary,
                    .carousel-secondary {
                        display: flex;
                        white-space: nowrap;
                    }

                    /* Keyframes for the scrolling effect */
                    @keyframes scroll-horizontal {
                        0% {
                            transform: translateX(100%); /* Start from the right */
                        }
                        100% {
                            transform: translateX(-100%); /* Move to the left */
                        }
                    }

                    /* Ensuring the images fade in */
                    .carousel {
                        visibility: hidden;
                        opacity: 0;
                        animation: fade-in 1s forwards, scroll-horizontal 20s linear infinite;
                    }

                    @keyframes fade-in {
                        0% {
                            opacity: 0;
                            visibility: visible;
                        }
                        100% {
                            opacity: 1;
                            visibility: visible;
                        }
                    }

                `}
            </style>

            <div className="dashboard-container">
                <h1>Welcome to Pulse</h1>
                <h2>Use the options in the navigation bar to find what is going on near you!</h2>
                <h3>Movies In Theaters Now</h3> {/* This will be aligned left */}
                {/* Scrolling Bar (Primary and Secondary Carousels) */}
                <div className="scroll-container">
                    <div className="carousel">
                        {/* First set of images (Primary) */}
                        <div className="carousel-primary">
                            <img src="https://i.etsystatic.com/56270335/r/il/ce6b9d/6481599580/il_794xN.6481599580_ieke.jpg" alt="Moana 2" />
                            <img src="https://preview.redd.it/megathread-wicked-2024-trailer-v0-zr10s2ppm1ic1.jpeg?auto=webp&s=71df15b3c68e1ec3ad0924dbb6b8476814c842a1" alt="Wicked" />
                            <img src="https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/85/fedce497491780e5a5d856d0602eebc0_original.jpg?t=1700044284" alt="Gladiator II" />
                            <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/235131/Y2K_2024.jpg" alt="Y2K" />
                        </div>

                        {/* Second set of images (Secondary) */}
                        <div className="carousel-secondary">
                            <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/237414/Flow_Janus_Poster_27x40_02_web.jpg" alt="Flow" />
                            <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/235359/WRB_Tree1Sheet6_RGB_1.jpg" alt="The Wild Robot" />
                            <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/237067/ANORA_Poster_Full.jpg" alt="Anora" />
                            <img src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster--dark-mode.png/0/images/MasterRepository/fandango/236932/WLIT_DOM_Online_Teaser_1-Sheet%202_Fin_10.jpg" alt="We Live In Time" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
