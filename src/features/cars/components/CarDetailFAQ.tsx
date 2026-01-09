'use client';

export function CarDetailFAQ() {
  return (
    <div className="col-half">
      <div className="box" id="faq_section">
        <div className="header_box">
          <h4>Frequently Asked Questions</h4>
          <a href="/help">
            <img src="/img/upd/file-text.svg" width="20" height="20" alt="Help" />
            Help Center
          </a>
        </div>
        <div className="row">
          <div className="block">
            <h5>Is the process of purchasing vehicles from WhestWheels complicated?</h5>
            <p>
              The process of purchasing vehicles through the WhestWheels platform is characterized by its ease and clarity. It is essential to have basic website navigation skills, including tasks such as{' '}
              <a href="/help/purchase-process?q=1">placing bids</a>, <a href="/help/deposit?q=23">depositing security</a>, and conducting international transfers in US dollars (USD) and euros (EUR) through your bank. We handle all formalities for the client, from contact with the auction house, documentation management, arranging transportation in the United States, loading into the container, unloading, customs clearance, to vehicle delivery to the specified address.
            </p>
            <a href="/how-it-works" className="btn_big">
              WhestWheels Vehicle Purchase Process
            </a>
          </div>
          <div className="block">
            <h5>How to pay for the auctioned vehicle?</h5>
            <p>
              To finalize the payment for the auctioned vehicle, you need a currency account in USD and the ability to make international foreign transfers. If you have doubts about conducting the transaction on your own, you can print the email received from us along with the attached <a href="/help/payments?q=28">PDF file</a> with transfer details and seek support at your local bank branch.
            </p>
          </div>
          <div className="block">
            <h5>What happens after winning a bid?</h5>
            <p>
              After winning a bid on the WhestWheels platform, your bid status will change to 'Vehicle Won'. This means your offer has been accepted by the seller, and you have purchased the vehicle. The final amount you pay may be lower than your maximum offered sum, thanks to WhestWheels' efforts to secure the car at the best price during live bidding. Within a few hours of the auction ending, you will receive an email with transaction details, including the account number, the exact amount to be paid, and the transfer title. Payments are made in USD, directing funds directly to the auction house, whether it's Copart or IAAI.
            </p>
            <a href="/schedule" className="btn_big">
              Import Schedule
            </a>
          </div>
          <div className="block">
            <h5>Does WhestWheels handle customs clearance and home delivery?</h5>
            <p>
              For all vehicles directed to Rotterdam, our main port, we offer comprehensive logistics services. This includes customs clearance and the delivery of the vehicle directly to the client's (for specific locations), ensuring the entire process of importing the car is comfortable and hassle-free for our clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

