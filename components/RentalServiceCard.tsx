// types
import { Services } from "@/types/types";

type RentalServiceCardProps = {
  service: Services;
};

export default function RentalServiceCard({ service }: RentalServiceCardProps) {
  return (
    <div className="lg:flex lg:items-center lg:gap-12 px-4" key={service.id}>
      <img className="pb-3" src={service.icon} alt="Service Icon" />
      <div>
        <h1 className="font-bold text-lg">{service.title}</h1>
        <p className="text-lg max-w-[700px]">{service.text}</p>
      </div>
    </div>
  );
}
