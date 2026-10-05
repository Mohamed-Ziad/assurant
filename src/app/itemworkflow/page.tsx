import StopwatchTimer from "@/components/ui/StopwatchTimer";
import DeviceInspectionForm from "@/features/device-inspection/DeviceInspectionForm";
import ItemWorkflowForm from "@/features/item-workflow/ItemWorkflowForm";

export default function ItemWorkflowPage() {
  return (
    <>
      <StopwatchTimer />

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <ItemWorkflowForm />
          </div>
          <div className="col-md-5 offset-md-3">
            <DeviceInspectionForm defaultMode="NTO" />
          </div>
        </div>
      </div>
    </>
  );
}
