export default function MovingGuideThird() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">
        3. Prepare your standard response
      </h1>
      <p className="text-[16px] leading-[24px]">
        When you apply for a property, it's important that your application
        stands out while still containing all the necessary information. You can
        use this template as a starting point and automatically copy it when
        you're interested in a property.
      </p>

      <h3 className="font-bold text-[16px] leading-[24px]">Wat extra tips:</h3>

      <ul className="list-disc ml-4 text-[16px] leading-[24px]">
        <li>If you're searching with someone, introduce them as well!</li>
        <li>Briefly mention your source of income and your salary.</li>
        <li>
          If you smoke, have pets, or have any other specific preferences, you
          can include them as well.
        </li>
        <li>
          You can make your application a bit more personal by adding hobbies,
          etc. Keep it short but personal.
        </li>
        <li>
          If you use the [[ADDRESS]] tag in your application, we will
          automatically replace it when you click on a match.
        </li>
      </ul>

      <textarea
        defaultValue={`Dear Landlord, 
        
I recently came across your property on [[ADDRESS]] and I'm very interested. I would love to apply for the viewing of the apartment.

I work as a [OCCUPATION] and my monthly income is €[INCOME]. I have all the required documents available.

I would appreciate it if you could let me know the viewing schedule and if I may attend.


Best regards,
[NAME]`}
        className="w-full h-[300px] border rounded-lg resize-none p-4"
      />

      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between">
        <div className="flex items-center gap-3">
          <input type="checkbox" />
          <span>Show registration letter for each property</span>
        </div>
        <button className="bg-main border border-main rounded-lg py-2 px-12 text-white font-semibold text-[16px] xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          Save
        </button>
      </div>
    </div>
  );
}
