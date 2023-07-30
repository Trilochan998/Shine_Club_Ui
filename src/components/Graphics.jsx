import React from "react";
import style from "../css/gallary.module.css";

const Graphics = () => {
  return (
    <section >
    <div className={style.customImage}>
      <ul
        id={style.portfolio_flters}
        class="d-flex justify-content-center aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <li data-filter="*" class={style.filter_active}>
          All
        </li>
        <li data-filter=".filter_app" class="">
          Image
        </li>
        <li data-filter=".filter_card" class="">
          Video
        </li>
      </ul>
    </div>
    <article id={style.galleryBody}>
    <div id={style.photo}>
      <img src={require("../testImage/111776.jpg")} alt=""/>
      <img src={require("../testImage/358aba06d2eb9117e7db721f39805c10.jpg")} alt=""/>
      <img src={require("../testImage/51-6.jpg")} alt=""/>
      <img src={require("../testImage/61YJmiawE+L.jpg")} alt=""/>
      <img src={require("../testImage/99939.jpg")} alt=""/>
      <img src={require("../testImage/99955.jpg")} alt=""/>
      <img src={require("../testImage/99959.jpg")} alt=""/>
      <img src={require("../testImage/HD-wallpaper-virat-kohli-cricket-india-indian-cricketer-rcb-thumbnail.jpg")} alt=""/>
      <img src={require("../testImage/HD-wallpaper-virat-kohli-in-blue-jersey-virat-kohli-blue-indian-cricket-king-kohli-sports-thumbnail.jpg")} alt=""/>
      <img src={require("../testImage/desktop-wallpaper-ms-dhoni-dhoni-stumping-in-ipl-ms-dhoni-csk-thumbnail.jpg")} alt=""/>
      <img src={require("../testImage/download.jpg")} alt=""/>
      <img src={require("../testImage/images.jpg")} alt=""/>
      <img src={require("../testImage/indian-cricket-ms-dhoni-4img70mp7pzoz67s.jpg")} alt=""/>
      <img src={require("../testImage/indian-cricket-jasprit-bumrah-and-virat-kohli-oa8xlcxka6ulhzpa.jpg")} alt=""/>
      <img src={require("../testImage/indian-cricket-ms-dhoni-4img70mp7pzoz67s.jpg")} alt=""/>
      <img src={require("../testImage/sara-660x365.jpg")} alt=""/>
      <img src={require("../testImage/358aba06d2eb9117e7db721f39805c10.jpg")} alt=""/>
      <img src={require("../testImage/Smriti-Mandhana.jpg")} alt=""/>
      <img src={require("../testImage/desktop-wallpaper-ten-most-beautiful-women-cricketers-around-the-world-australian-women-cricketers.jpg")} alt=""/>
      <img src={require("../testImage/desktop-wallpaper-women-criket-players-cricket-players-thumbnail.jpg")} alt=""/>
      <img src={require("../testImage/Smriti-Mandhana.jpg")} alt=""/>
      <img src={require("../testImage/images (1).jpg")} alt=""/>
      <img src={require("../testImage/HD-wallpaper-hitman-sharma-indian-cricket-rohit-sharma-thumbnail.jpg")} alt=""/>
      <img src={require("../testImage/images.jpg")} alt=""/>

v


    </div>
    </article>
    </section>
  );
};

export default Graphics;
