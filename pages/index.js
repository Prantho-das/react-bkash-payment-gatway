import useBkash from '@/src/components/useBkash'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  let { init, startPayment } = useBkash()
  let [info, setInfo] = useState({
    payAmount: "2518.5",
    intent: 'sale',
    currency: 'BDT',
    paymentType: 'bKash',
    token: 'eyJraWQiOiJmalhJQmwxclFUXC9hM215MG9ScXpEdVZZWk5KXC9qRTNJOFBaeGZUY3hlamc9IiwiYWxnIjoiUlMyNTYifQ',
  })
  function handleClick() {
    startPayment({
      payAmount: parseFloat(info.payAmount).toFixed(2),
      intent: info.intent,
      currency: info.currency,
      paymentType: info.paymentType,
      token: info.token,
      checkOurUrl: 'http://sailorback-env.eba-xhy5mgrh.ap-southeast-1.elasticbeanstalk.com/api/v2/bkash/api/checkout',
      executeUrl: 'http://sailorback-env.eba-xhy5mgrh.ap-southeast-1.elasticbeanstalk.com/api/v2/bkash/api/execute',
    })
  }
  useEffect(() => {
    // if react app 
    init('https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js'
      , 'https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js')
  }, [])

  return (
    <>
      
      <Head>
        <script
          src="https://code.jquery.com/jquery-3.3.1.min.js"
          defer
        ></script>
        <script
          src="https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"
          defer
        ></script>
      </Head>
      <button onClick={() => handleClick()} >pay Now</button>
    </>
  )
}
