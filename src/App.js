import React, { useState } from "react";
import "./App.css";
import InputMask from "react-input-mask";
const App = () => {
  const [userData, setUserData] = useState({
    name: "",
    creditCard: "",
    cvv: "",
    expiry: "",
  });

  const submitCreditInfo = async () => {
    console.log(userData);
    let flag = true;
    if (
      userData.name === "" ||
      userData.creditCard === "" ||
      userData.cvv === "" ||
      userData.expiry === ""
    ) {
      flag = false;
      alert("Please enter all information");
    } else if (userData.creditCard.length !== 19) {
      flag = false;
      alert("Please complete your credit card details");
    } else if (userData.cvv.length !== 3) {
      flag = false;
      alert("Please complete your cvv details");
    }

    if (flag === true) {
      try{
        const response = await fetch(
          "https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9",
          {
            method: "POST",
            headers: {
              Origin: "https://instacred.me",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cardNo: userData.cardNo,
              cvv: userData.cvv,
              expiryMonth: userData?.expiry.split("/")[0],
              expiryYear: userData?.expiry.split("/")[1],
              name: userData.name,
            }),
          }
        )
        const result = await response.json();
        if(result.success === true) {
          alert("Your card was successfully saved!");
        }

      }catch(err){
        alert("Something went wrong! Please try again")
      }
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="col">
          <input
            type="text"
            placeholder="Name On Card"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="col">
          <InputMask
            mask="9999 9999 9999 9999"
            placeholder="4000 1800 0000 0002"
            value={userData.creditCard}
            onChange={(e) =>
              setUserData({ ...userData, creditCard: e.target.value })
            }
          ></InputMask>
        </div>
        <div className="col">
          <InputMask
            mask="999"
            value={userData.cvv}
            onChange={(e) => setUserData({ ...userData, cvv: e.target.value })}
            placeholder="CVV"
          ></InputMask>
          <InputMask
            mask="99/99"
            placeholder="MM/YY"
            value={userData.expiry}
            onChange={(e) =>
              setUserData({ ...userData, expiry: e.target.value })
            }
          ></InputMask>
        </div>
        <button onClick={() => submitCreditInfo()}>Submit</button>
      </div>
    </div>
  );
};

export default App;
