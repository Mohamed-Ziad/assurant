import StopwatchTimer from "@/components/ui/StopwatchTimer";
import DeviceInspectionForm from "@/features/device-inspection/DeviceInspectionForm";
import ItemWorkflowForm from "@/features/item-workflow/ItemWorkflowForm";

export default function ItemWorkflowPage() {
  return (
    <>
      <StopwatchTimer />

      <div className="row">
        <div className="col-lg-4">
          <ItemWorkflowForm />
        </div>
        <div className="col-lg-7">
          <DeviceInspectionForm defaultMode="NTO" />
        </div>
      </div>
    </>
  );
}
