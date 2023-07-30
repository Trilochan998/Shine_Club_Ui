import axios from "axios";
import { useEffect, useState } from "react";
import style from "../css/member.module.css";
const User = () => {
  let [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    axios
      // .get("http://localhost:3000/content")
      .get("http://localhost:8080/getAllMember")
      .then((response) => {
        console.log(response);
        setFetchData(response.data);
      })
      .catch(() => {
        console.log("Data not found");
      });
  }, []);

  return (
    //     <div id={style.myUser}>

    //     {fetchData.map((fetch)=>{
    //         return(
    //             <div id={style.cards}>
    //                  <table >
    //                  <tr>
    //                        <td><img src= {require('../testImage/111776.jpg')} alt="my_image" style={{height:'150px', width:'100px'}}/></td>
    //                      </tr>
    //                      <tr>
    //                        <td>Name:</td>
    //                        <td>{fetch.name}</td>
    //                      </tr>
    //                      <tr>
    //                          <td>Contact No:</td>
    //                          <td>{fetch.phoneNo}</td>
    //                      </tr>
    //                      <tr>
    //                         <td>Email:</td>
    //                         <td>{fetch.email}</td>
    //                      </tr>
    //                  </table>

    //             </div>
    //         )
    //     })}
    // </div>
    <div id={style.myUser}>
      {fetchData.map((fetch) => {
        return (
          <div id={style.cards}>
            <div id={style.image_section}>
              {/* <img
                src={require("../testImage/services-2.jpg")}
                alt="my_image"
                style={{
                  height: "250px",
                  width: "400px",
                  borderRadius: "10px",
                }}
              /> */}
              {fetch.image && (
                <img src={`data:image/jpg;base64,${fetch.image}`}
                  alt=""
                  style={{
                    height: "250px",
                    width: "400px",
                    borderRadius: "10px",
                  }}
                >
                
                </img>
              )
              
              }
            </div>
            <div id={style.member_icon}>
              <p>Name: {fetch.name}</p>
              <p>Contact No: {fetch.phoneNo}</p>
              <p>Email: {fetch.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default User;
