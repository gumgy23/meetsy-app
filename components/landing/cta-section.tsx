import Link from "next/link";
import SectionHeading from "../common/section-heading";
import { Button } from "../ui/button";

export default function CtaSection() {
  return (
    <section className="section-container">
      <div className="section-padding">
        <div className="border rounded-lg p-8 sm:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionHeading 
                    title="Stop Learning Alone"
                    description="Get matched wiht someone who's learning the same things. Hold each other accountable. Make real progress" />
            <Link href="/sign-up">
              <Button size="lg">Try for Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}