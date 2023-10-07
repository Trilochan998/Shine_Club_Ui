import { useCallback, useEffect } from "react";
import { useState } from 'react';
import useRazorpay from "react-razorpay";
import axios from 'axios';
import payLogo from '../testImage/Hacker.png'
import LoadingSpinner from "./LoadingSpinner";

function MakePayment(props) {
  const Razorpay = useRazorpay();
  const [orderDetails, setOrderDetails] = useState({});

  const [phoneNo, setPhoneNo] = useState("")
  const [memberName, setMemberName] = useState("")


  useEffect(() => {
    // Retrieving the object from localStorage when the component mounts
    const storedObjectData = localStorage.getItem("user_login_data");
      const parsedObjectData = JSON.parse(storedObjectData);
      setPhoneNo(parsedObjectData.mobileNo);
      setMemberName(parsedObjectData.memberName)
      console.log(parsedObjectData.mobileNo);
  }, []);

  const userDetails = {
    "mobileNo": phoneNo,
    "amount": props.amount
  };
  const createOrder = async (order) => {
    let token = localStorage.getItem('token');
    // axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
    const responseOrder = await (await axios.post('http://localhost:8080/payment/generatePayment', userDetails)).data
    // .then(response => response.data)
    return responseOrder
  }

  const handlePayment = async (params) => {
    const order = await createOrder(params);
    var array=document.getElementsByClassName('loading-spinner');
    for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element.classList.remove("hideIt");
            element.classList.add("showOverlay");
        //   console.log(element);
        }
        
    console.log(order);
    console.log(order.secretKey);
    console.log(order.razorPayOrderId);
    console.log(order.applicationFee);
    const options = {
      key: order.secretKey, // Enter the Key ID generated from the Dashboard
      amount: order.applicationFee, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: memberName,
      description: "Test Transaction",
      image:payLogo ,
      order_id: order.razorPayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        let token = localStorage.getItem('token');
        // Here we will store razorpay_payment_id, razorpay_order_id, razorpay_signature, email, contact, amount, payment date, customer id into db
        // axios.get('http://localhost:9090/successOrder',{ headers: {"Authorization" : `Bearer ${token}`} })

        const paymentDetails = {
          "dateOfTransction": "",
          "paymentStatus": "",
          "razorpay_payment_id": response.razorpay_payment_id,
          "razorpay_order_id": response.razorpay_order_id,
          "razorpay_signature": response.razorpay_signature,
          "customerName": memberName,
          "mobileNo": phoneNo,
          "applicationFee": order.applicationFee,
           "year":"",
           "month":""
        }
        console.log(paymentDetails);
        axios.post("http://localhost:8080/payment/savePaymentDetails", paymentDetails)
          .then((resp) => {
            console.log("sonunigam");
            console.log(resp.data);
            console.log("sonu");
            if (resp.status === 200) {
                console.log("sonunigam bar");
                console.log(resp.data.transction);
                localStorage.setItem('transction', JSON.stringify(resp.data.transction));
              window.location.href = './profile';
            }
          }).catch((error) => {
            console.log(error);
          });
      },

      prefill: {
        name: userDetails.customerName,
        email: userDetails.email,
        contact: userDetails.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },

      //   redirect: true, // this redirects to the bank page from my website without opening a new window
      //   callback_url: '/product'
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      // alert("code"+response.error.code);
      // alert("description"+response.error.description);
      // alert("source"+response.error.source);
      // alert("step"+response.error.step);
      // alert("reason"+response.error.reason);
      // alert("orderId"+response.error.metadata.order_id);
      // alert("paymentId"+response.error.metadata.payment_id);
    });

    rzp1.open();
  };
  return (
    <>
    <td className="inner-div">
      <button className="btn btn-primary" onClick={handlePayment}>Pay Me</button>
    </td>
    <div className='loading-spinner hideIt'><LoadingSpinner></LoadingSpinner></div>
    </>
  );
}

export default MakePayment;
