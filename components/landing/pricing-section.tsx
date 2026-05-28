import { PricingTable } from "@clerk/nextjs";
import SectionHeading from "../common/section-heading";

export default function PricingSection() {
  return (
    <section className="section-container" id="pricing">
      <div className="section-padding">
        <SectionHeading 
              title="Simple, Transparent Pricing"
              description="Choose the plan that works best for you, Start free and upgrade as you grow" />
        <div className="max-w-6xl mx-auto">
          <PricingTable />
        </div>
        
      </div>
    </section>
  );
}