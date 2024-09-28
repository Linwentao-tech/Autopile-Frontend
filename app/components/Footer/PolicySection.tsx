function PolicySection() {
  return (
    <section>
      <hr className="border border-gray-600 " />
      <ul className="grid grid-cols-5 items-center justify-items-center my-10 text-gray-400 text-sm">
        <li>Terms & Conditions</li>
        <li className="pr-6">Privacy Policy</li>
        <li>Shipping Policy</li>
        <li className="pr-10">Refund Policy</li>
        <li className="pl-6">Cookie Policy</li>
      </ul>
      <hr className="border border-gray-600 " />
    </section>
  );
}

export default PolicySection;
