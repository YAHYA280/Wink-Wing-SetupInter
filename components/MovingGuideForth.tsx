export default function MovingGuideForth() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">
        4. Collect all necessary documents
      </h1>
      <p className="text-[16px] leading-[24px]">
        Are you going to view a property? Agents or landlords often ask for
        several documents to verify your identity and financial situation.Make
        sure you have these ready, including any documents from your partner or
        housemates, to send.
      </p>

      <div>
        <h3 className="font-bold text-[16px] leading-[24px]">For everyone</h3>
        <ul className="list-disc ml-4 text-[16px] leading-[24px]">
          <li>Copy of your passport or ID</li>
          <li>
            Extract from the population register: Proof of registration in the
            Personal Records Database (BRP) of your municipality. You can
            request this from the municipality where you currently live,
            sometimes for a fee. It's not always required, but keep in mind it
            can take a few days to process.
          </li>
          <li>
            A tenant reference: A written statement from your previous landlord
            about your payment behavior and conduct as a tenant. Not always
            required, but useful to have ready.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[16px] leading-[24px]">Employed</h3>
        <ul className="list-disc ml-4 text-[16px] leading-[24px]">
          <li>
            An income statement: You can download this via Mijn Belastingdienst
            (My Tax Authority).
          </li>
          <li>
            A year-end statement for the previous year. Employers often send
            these in January or February, but if you haven't received yours yet,
            you can request it from your employer.
          </li>
          <li>Three recent pay slips.</li>
          <li>
            A bank statement showing the deposit of your salary. This proves
            that your salary is paid into your personal account.
          </li>
          <li>
            Employer's statement: A written confirmation of your regular income.
            Not always required, but useful to have ready.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-[16px] leading-[24px]">Self-employed</h3>
        <ul className="list-disc ml-4 text-[16px] leading-[24px]">
          <li>A copy of your most recent final income tax assessment.</li>
          <li>A trade register extract from the Chamber of Commerce (KvK).</li>
          <li>Profit and loss statement for the past 2-3 years.</li>
        </ul>
      </div>
    </div>
  );
}
