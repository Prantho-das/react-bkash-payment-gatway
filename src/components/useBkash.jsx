import React, { createElement, useCallback } from "react";
import scriptInit from "../utils/scriptInit";
import axios from "axios";
import Head from "next/head";

const useBkash = () => {
  function createBkashButton() {
    let bkashBtn = document.createElement("button");
    bkashBtn.setAttribute("id", "bkash_button");
    bkashBtn.setAttribute("class", "d-none");
    bkashBtn.innerHTML = "Pay With bKash";
    document.body.appendChild(bkashBtn);
  }
  let init = async (jqueryScript, bkashUrl, isReact = false) => {
    createBkashButton();
    if (isReact) {
      if (jqueryScript && bkashUrl) {
        scriptInit(jqueryScript, "jquery");
        scriptInit(bkashUrl, "bkash-checkout");
        createBkashButton();
      }
    }
  };

  let startPayment = async ({
    payAmount,
    payIntent = "sale",
    token,
    checkOurUrl,
    executeUrl,
    onSuccess,
    onError,
  }) => {
    let paymentId = "";
    await bKash.init({
      paymentMode: "checkout",
      //fixed value ‘checkout’
      //paymentRequest format: {amount: AMOUNT, intent: INTENT}
      //intent options
      //1) ‘sale’ – immediate transaction (2 API calls)
      //2) ‘authorization’ – deferred transaction (3 API calls)
      paymentRequest: {
        amount: payAmount, //max two decimal points allowed
        intent: payIntent,
      },
      createRequest: async (request) => {
        axios
          .post(`${checkOurUrl}/${token}/${payAmount}`)
          .then((data) => {
            if (data && data.paymentID) {
              bKash.create().onSuccess(data);
              onSuccess(data);
            } else {
              bKash.create().onError();
              onError(data);
            }
          })
          .catch((err) => {
            bKash.create().onError();
            onError(err);
          });
      },
      executeRequestOnAuthorization: async function () {
        axios
          .post(
            `${executeUrl}/${token}`,
            {
              paymentId: paymentId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((data) => {
            if (data && data.paymentID) {
              onSuccess(data);
            } else {
              onError(data);
            }
            return data;
          })
          .catch((err) => {
            bKash.execute().onError();
            onError(err);
          });
      },
    });
    document.getElementById("bKash_button").click();
  };
  return {
    init,
    startPayment,
  };
};

export default useBkash;
