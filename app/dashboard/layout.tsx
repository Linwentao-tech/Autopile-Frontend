import DashboardNav from "../components/DashboardNav";
import { ChildrenProps } from "../components/InterfaceType";

function layout({ children }: ChildrenProps) {
  return (
    <div className="mx-14 flex items-start gap-96">
      <DashboardNav />
      {children}
    </div>
  );
}

export default layout;
