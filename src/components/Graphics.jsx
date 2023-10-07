import React, { useEffect, useState } from "react";
import style from "../css/gallary.module.css";
import axios from "axios";

const Graphics = () => {

  const [filter, setFilter] = useState("image");
  const [activeVideo, setActiveVideo] = useState(null);
  const [imageUrls,setImageurls] = useState([]);

  const handleFilterClick = (filter) => {
    setFilter(filter);
    if(filter === "image"){
      axios.get("http://localhost:8080/getImages")
      .then(response => setImageurls(response.data))
      .catch(error => console.error(error))
    }
  };

  const handleVideoPlay = (videoId) => {
    // Pause the currently active video (if any)
    if (activeVideo && activeVideo !== videoId) {
      const currentVideo = document.getElementById(activeVideo);
      if (currentVideo) {
        currentVideo.pause();
      }
    }

    // Set the clicked video as the active one
    setActiveVideo(videoId);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/getImages")
      .then(response => setImageurls(response.data))
      .catch(error => console.error(error))
  }, []);

  return (
    <section >
    <div className={style.customImage}>
      <ul
        id={style.portfolio_flters}
        class="d-flex justify-content-center aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <li data-filter=".filter_app"  onClick={() => handleFilterClick("image")}
            className={filter === "image" ? style.filter_active : ""}>
          Image
        </li>
        <li data-filter=".filter_card" onClick={() => handleFilterClick("video")}
            className={filter === "video" ? style.filter_active : ""}>
          Video
        </li>
      </ul>
    </div>
    <article id={style.galleryBody}>
    <div id={style.photo} className="gallery">
    {filter === "image" ? (
      <>
      {
        imageUrls.map((imageUrl, index) =>(
      <img key={index} src={`http://localhost:8080${imageUrl}`} alt={`photos ${index + 1}`}/>

        ))
      }
      {/* <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.13.51 PM (2).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.03 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.14 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.25 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.26 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.26 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.27 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.31 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.40 PM (2).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.43 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.44 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.46 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.47 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.47 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.52 PM (2).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.14.58 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.15.31 PM (1).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.15.30 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.15.30 PM (2).jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.15.29 PM.jpeg")} alt=""/>
      <img src={require("../testImage/WhatsApp Image 2023-10-02 at 7.15.29 PM (1).jpeg")} alt=""/> */}

      </>
       ) : null}

{filter === "video" ? (
  <>
     <iframe id="video1" src="https://www.youtube.com/embed/9tzrb2bk4iI" allowfullscreen onClick={() => handleVideoPlay("video1")}>
</iframe>
<iframe id="video2" src="https://www.youtube.com/embed/H6bJkTldxMU?list=RDEMXSr9H87S-XTuDU1eTZP49g" allowfullscreen onClick={() => handleVideoPlay("video2")}>
</iframe>
<iframe width="338" height="601" src="https://www.youtube.com/embed/A66k2KMlI5M" title="ବିଶ୍ଵ ପରିବେଶ ଦିବସ ଉପଲକ୍ଷେ Shine Club railly // World Environment Day Railly....#viral #video #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </>
) : null}
    </div>
    </article>
    </section>
  );
};

export default Graphics;
