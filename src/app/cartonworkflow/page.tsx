import StopwatchTimer from "@/components/ui/StopwatchTimer";
import CartonWorkflowView from "@/features/carton-workflow/CartonWorkflowView";

export default function CartonWorkflowPage() {
  return (
    <>
      <StopwatchTimer />

      <div className="container-fluid mt-4">
        <CartonWorkflowView />
      </div>
    </>
  );
}
