const CreditCard = () => {
  return (
    <div class="w-[24em] h-[14em] m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
      <img
        class="relative object-cover w-full h-full rounded-xl"
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div class="w-full px-[2em] absolute top-[2em]">
        <div class="flex justify-between">
          <div class="">
            <p class="font-light">Name</p>
            <p class="font-medium tracking-widest">Karthik P</p>
          </div>
          <img
            class="w-[3.5em] h-[3.5em]"
            src="https://i.imgur.com/bbPHJVe.png"
          />
        </div>
        <div class="pt-[0.25em]">
          <p class="font-light">Card Number</p>
          <p class="font-medium tracking-more-wider">4642 3489 9867 7632</p>
        </div>
        <div class="pt-[1.5em] pr-[1.5em]">
          <div class="flex justify-between">
            <div class="">
              <p class="font-light text-xs">Valid</p>
              <p class="font-medium tracking-wider text-sm">11/15</p>
            </div>
            <div class="">
              <p class="font-light text-xs ">Expiry</p>
              <p class="font-medium tracking-wider text-sm">03/25</p>
            </div>

            <div class="">
              <p class="font-light text-xs">CVV</p>
              <p class="font-bold tracking-more-wider text-sm">···</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
