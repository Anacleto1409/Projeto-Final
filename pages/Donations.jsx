export default function Donations() {
  return (
    <div className="donations">
      <p>
        Developers also need to eat, support us by clicking on the button below!
      </p>
      <button
        onClick={() =>
          window.open(
            "https://www.paypal.com/donate/?hosted_button_id=GSCKRFFFR3Z8Q",
            "_blank"
          )
        }
      >
        Make a donation!
      </button>
    </div>
  );
}
