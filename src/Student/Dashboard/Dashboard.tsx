import Typography from "@mui/material/Typography";
import { HeaderStudent } from "../Headers/HeaderStudent";
import { StudentSidebar } from "../Sidebars/StudentSidebar";
import EachNotice from "./EachNotice";
import { Extras } from "./Extras";

export const htmlTypography = (html: JSX.Element) => {
  return (
    <Typography paragraph sx={{ fontSize: "1rem" }}>
      {html}
    </Typography>
  );
};

export default function DashBoard() {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="w-100">
        <HeaderStudent />
        <div className="row w-100 m-0">
          <div
            className="col-md-9 col-12 border-right"
            style={{ backgroundColor: "#dddddd64" }}
          >
            {["Google, India", "Microsoft, India", "FutureFirst, Kolkata"].map(
              (item: string) => (
                <EachNotice company={item} />
              )
            )}
          </div>
          <div className="displayNone col-md-3 col-12 px-1 py-0 extrasticky">
            <Extras />
          </div>
        </div>
      </div>
    </div>
  );
}
