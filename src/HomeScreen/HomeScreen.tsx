import "./style.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <div>
      <div className="HomeScreen">
        <div className="image">
          <div className="HomeButtonDiv w-100">
            <div className="HomeButtonDivRow w-100">
              <div className="mx-4 row">
                <div className="col-sm-12 col-md-12 col-lg-4 my-4">
                  <div className="d-flex justify-content-center">
                    <Link to="/company/auth">
                      <Button
                        variant="contained"
                        className="green2b text-white authButton w-100"
                        sx={{ fontSize: "1.4rem" }}
                      >
                        For Companies
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 my-4 ">
                  <div className="d-flex justify-content-center">
                    <Link to="/student/auth">
                      <Button
                        variant="contained"
                        className="green2b text-white authButton w-100"
                        sx={{ fontSize: "1.4rem" }}
                      >
                        For Students
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4 my-4">
                  <div className="d-flex justify-content-center">
                    <Link to="/admin/auth">
                      <Button
                        variant="contained"
                        className="green2b text-white authButton w-100"
                        sx={{ fontSize: "1.4rem" }}
                      >
                        For Admin
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
