import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

interface Props {
    eligibilityCriteria: {
      isEligible?: boolean;
      isProfileVerified?: {
        isEligible?: boolean;
        message?: string;
      };
      placementCyclEligibility?: {
        isEligible?: boolean;
        message?: string;
      };
      isNotPlaced?: {
        isEligible?: boolean;
        message?: string;
      };
      backlogEligibility?: {
        isEligible?: boolean;
        message?: string;
      };
      courseEligibility?: {
        isEligible?: boolean;
        message?: string;
      };
      academicEligibility?: {
        isEligible?: boolean;
        message?: {
          Required?: number;
          Actual?: number;
        };
      };
      edu_History_10_Eligibility?: {
        isEligible?: boolean;
        message?: {
          Required?: number;
          Actual?: number;
        };
      };
      edu_History_12_Eligibility?: {
        isEligible?: boolean;
        message?: {
          Required?: number;
          Actual?: number;
        };
      };
    }[];
  }
  

export const EligibilityCriteria: React.FC<Props> = ({
  eligibilityCriteria,
}) => {
  const isEligible = (value?: boolean) => {
    if (value) {
      return <CheckCircleOutlinedIcon color="success" />
    }
    return <CancelOutlinedIcon color="error" />
  }

  const EligibilityItem: React.FC<{
    isEligible: boolean | null
    message: string | JSX.Element
  }> = ({ isEligible, message }) => (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          {isEligible ? (
            <CheckCircleOutlinedIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          )}
        </ListItemIcon>
        <ListItemText primary={message} />
      </ListItemButton>
    </ListItem>
  )

  const OverallEligible: React.FC<{ isEligible?: boolean }> = ({
    isEligible,
  }) => {
    if (eligibilityCriteria[0]?.isNotPlaced?.isEligible) {
      return (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CheckCircleOutlinedIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="Yes, you are eligible to apply" />
          </ListItemButton>
        </ListItem>
      )
    } else {
        return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ErrorOutlineOutlinedIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="No, you are not eligible to apply" />
              </ListItemButton>
            </ListItem>
          )
        }
    }

    

  const academicEligibilityItems = [
    {
      title: 'DUAL',
      required:
        eligibilityCriteria[0]?.academicEligibility?.message?.Required || 0,
      actual: eligibilityCriteria[0]?.academicEligibility?.message?.Actual || 0,
    },
    {
      title: 'CLASS XII',
      required:
        eligibilityCriteria[0]?.edu_History_12_Eligibility?.message?.Required ||
        0,
      actual:
        eligibilityCriteria[0]?.edu_History_12_Eligibility?.message?.Actual ||
        0,
    },
    {
      title: 'CLASS X',
      required:
        eligibilityCriteria[0]?.edu_History_10_Eligibility?.message?.Required ||
        0,
      actual:
        eligibilityCriteria[0]?.edu_History_10_Eligibility?.message?.Actual ||
        0,
    },
  ]

  console.log(eligibilityCriteria[0]?.courseEligibility)

  return (
    <Box sx={{ width: '100%'}}>
      <List>
        <OverallEligible isEligible={eligibilityCriteria[0]?.isEligible} />
        <EligibilityItem
          isEligible={
            eligibilityCriteria[0]?.isProfileVerified?.isEligible || null
          }
          message={'Profile is Verified'}
        />
        <EligibilityItem
          isEligible={
            eligibilityCriteria[0]?.placementCyclEligibility?.isEligible || null
          }
          message={'Eligible for this Placement Cycle'}
        />
        {/* <EligibilityItem
          isEligible={eligibilityCriteria[0]?.isNotPlaced?.isEligible || null}
          message={'Eligible for this job'}
        /> */}
        <EligibilityItem
          isEligible={
            eligibilityCriteria[0]?.courseEligibility?.isEligible || null
          }
          message={
            <>
              <Typography variant="body1" component="span">
                <span style={{ fontWeight: 'bold' }}>Course Eligibility: </span>
                {eligibilityCriteria[0]?.courseEligibility?.message}
              </Typography>
            </>
          }
        />
        <EligibilityItem
          isEligible={
            eligibilityCriteria[0]?.backlogEligibility?.isEligible || null
          }
          message={
            <>
              <Typography variant="body1" component="span">
                <span style={{ fontWeight: 'bold' }}>Backlogs: </span>
                {eligibilityCriteria[0]?.backlogEligibility?.message}
              </Typography>
            </>
          }
        />
        <ListItem>
          <ListItemIcon>
            {isEligible(
              eligibilityCriteria[0]?.academicEligibility?.isEligible,
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" component="span">
                <span style={{ fontWeight: 'bold' }}>
                  Academic Eligibility:{' '}
                </span>
              </Typography>
            }
          />
        </ListItem>
        <List sx={{ padding: '0 0 0 5rem' }}>
          {academicEligibilityItems.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemText
                primary={
                  <Typography variant="caption">
                    {`${item.title} - Required: ${item.required} CGPA, Actual: ${item.actual} CGPA`}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </List>
    </Box>
  )
}

export default EligibilityCriteria
