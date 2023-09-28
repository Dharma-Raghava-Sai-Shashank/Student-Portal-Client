import React, { useRef } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { generateHeading } from '../../Admin/Placement/ShowJob'
import { HtmlText } from '../../Admin/Placement/ShowJob'
import { convertStringToHTML } from '../Dashboard/EachNotice'
import { htmlTypography } from '../Dashboard/Dashboard'
import { HiringWorkflow } from './HiringWorkflow'
import { EligibilityCriteria } from './EligibilityCriteria'
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
interface props {
  jobDescription: {
    nfId: number
    type: string
    status: string
    companyName: string
    categoryname: string
    profile: string
    placeOfPosting: string
    modeOfInternship: string
    ctc: string
    ctcBreakDown: {}
    bondDetails: string
    hasPPO: string
    description: string
    skills: string
    additionalInfo: string
    logo: string
  }
  hiringWorkflow: Stage.RootObject[]
  eligibilityCriteria: {
    isEligible: boolean
    isProfileVerified: {
      isEligible: boolean
      message: string
    }
    placementCyclEligibility: {
      isEligible: boolean
      message: string
    }
    isNotPalced: {
      isEligible: boolean
      message: string
    }
    backlogEligibility: {
      isEligible: boolean
      message: string
    }
    courseEligibility: {
      isEligible: boolean
      message: string
    }
    academicEligibility: {
      isEligible: boolean
      message: {
        Required: number
        Actual: number
      }
    }
    edu_History_10_Eligibility: {
      isEligible: boolean
      message: {
        Required: number
        Actual: number
      }
    }
    edu_History_12_Eligibility: {
      isEligible: boolean
      message: {
        Required: number
        Actual: number
      }
    }
  }[]
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function Navbar({
  jobDescription,
  hiringWorkflow,
  eligibilityCriteria,
}: props) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const generateDetails = (detailType: any, detail: any | undefined) => {
    return (
      <div className="row mt-3 border-bottom">
        <div className="col-3 ">
          <Typography variant="subtitle2" sx={{ color: 'gray' }} gutterBottom>
            {detailType}
          </Typography>
        </div>
        <div className="col-9">
          <Typography variant="body2" sx={{ fontSize: '0.93rem' }} gutterBottom>
            {detail}
          </Typography>
        </div>
      </div>
    )
  }
  const isEligible = (eligible: boolean) => {
    if (eligible) return <CheckCircleOutlinedIcon color="success" />
    return <CancelOutlinedIcon color="error" />
  }
  const overallEligible = (overalleligibile: boolean) => {
    if (overalleligibile)
      return (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DoneOutlineOutlinedIcon color="success" />
            </ListItemIcon>
            <Typography variant="subtitle2" color="success">
              Yes, you are eligible to apply
            </Typography>
          </ListItemButton>
        </ListItem>
      )
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ErrorOutlineOutlinedIcon color="error" />
          </ListItemIcon>
          <Typography variant="subtitle2" color="error">
            No, you are not eligible to apply
          </Typography>
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            icon={<BusinessCenterOutlinedIcon />}
            iconPosition={`${window.outerWidth < 600 ? 'top' : 'start'}`}
            label="Job Description"
            sx={{ width: '33%' }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<SchemaOutlinedIcon />}
            iconPosition={`${window.outerWidth < 600 ? 'top' : 'start'}`}
            label="Hiring Workflow"
            sx={{ width: '33%' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<RuleOutlinedIcon />}
            iconPosition={`${window.outerWidth < 600 ? 'top' : 'start'}`}
            label="Eligibility Criteria"
            sx={{ width: '33%' }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div className="py-3">
            <div>
              <div className="mb-5">
                {generateHeading('Company Details')}
                <div className="mt-2 mb-3">
                  {generateDetails('Company Name', jobDescription.companyName)}
                  {generateDetails('Placement Cycle', 'Full time 2022-23')}
                  {generateDetails('Website', 'careers.google.com')}
                  {generateDetails('Category', jobDescription.categoryname)}
                  {generateDetails('About', 'About the Company')}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading('Job Details')}
                <div className="mt-2 mb-3">
                  {generateDetails('Designation', jobDescription.profile)}
                  {generateDetails(
                    'Place of Posting',
                    jobDescription.placeOfPosting,
                  )}
                  {generateDetails(
                    'Job Description',
                    jobDescription.placeOfPosting,
                  )}
                  {generateDetails('Category', 'E-Commerece')}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading('Salary Details')}
                <div className="mt-2 mb-3">
                  {generateDetails('CTC (in lpa)', jobDescription.ctc)}
                  {generateDetails(
                    'CTC breakup',
                    `Base Salary: Rs ${jobDescription.ctc} Stock: Rs 13,00,000`,
                  )}
                  {generateDetails(
                    'Bond Details',
                    jobDescription.bondDetails
                  )}
                  {generateDetails('Category', jobDescription.categoryname)}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading('Attached Documents')}
                <div className="mt-2 mb-3">
                  {generateDetails(
                    'Document Title',
                    '<Link of Document with Name>',
                  )}
                  {generateDetails(
                    'Document Title 2',
                    '<Link of Document 2 with Name>',
                  )}
                </div>
              </div>
              <div className="mb-5">
                {generateHeading('Additional Information')}
                <div className="mt-2 mb-3">{htmlTypography(HtmlText)}</div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="column">
          <HiringWorkflow hiringWorkflow={hiringWorkflow} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <EligibilityCriteria eligibilityCriteria={eligibilityCriteria} />
        </div>
      </TabPanel>
    </Box>
  )
}
