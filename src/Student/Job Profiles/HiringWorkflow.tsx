import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

interface props {
  hiringWorkflow: Stage.RootObject[];
}

export const HiringWorkflow = ({ hiringWorkflow }: props) => {
  const findActiveState = () => {
    return hiringWorkflow.findIndex((stage) => stage.isCompleted === 0);
  };

  const StepIcon = (stage: Stage.RootObject) => {
    // console.log(stage);

    if (stage.isCompleted === 1 && stage.isSelected === 1)
      return (
        <Tooltip title="Stage is over. You have been selected">
          <TaskAltIcon color="success" />
        </Tooltip>
      );
    else if (stage.isCompleted === 1 && stage.isSelected === 0)
      return (
        <Tooltip title="Stage is over. You are not selected">
          <CancelOutlinedIcon color="error" />
        </Tooltip>
      );
    else return null;
  };

  return (
    <div>
      <Box sx={{ maxWidth: 800 }}>
        <Stepper activeStep={findActiveState() - 1} orientation="vertical">
          {hiringWorkflow.map((stage: Stage.RootObject) => (
            <Step key={stage.seqNo}>
              <StepLabel icon={StepIcon(stage)}>
                {stage.stageName}
                <div>
                  <Typography variant="caption">
                    &#x2022;{" Type: " + stage.stageType + "  "}&#x2022;
                    {" Mode: "}
                    {stage.stageMode + "  "}
                  </Typography>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};
