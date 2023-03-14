import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import Select from 'react-select';

import "./index.scss";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};



function Department() {
  const [togglec, settogglec] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState('');
  const [open3, setOpen3] = useState('');
  const [open4, setOpen4] = useState('');
  const [open5, setOpen5] = useState('');
  const [storage, setStorage] = useState([]);
  const [Degree, setDegree] = useState('');
  const [DegreePeroid, setDegreePeriod] = useState(0);
  const [Department, setDepartment] = useState('');
  const [Course, setCourse] = useState('');
  const [CourseCode, setCourseCode] = useState('');
  const [error, seterror] = useState('');
  const [error2, seterror2] = useState('');
  const [error3, seterror3] = useState('');
  const [error4, seterror4] = useState('');
  const [error5, seterror5] = useState('');
  const [store, setstore] = useState([]);
  const [storefcourse, setstorefcourse] = useState([]);
  const [selectedvalue, setselectedvalue] = useState([]);
  const handleCourseStorage = () => {
    let temp = [...storage];
    let temp2 = [];

    for (let i = 0; i < temp.length; i++) {
      let Degreeobj = {
        degreeName: '',
        degreePeriod: '',
        courses: [],
      }
      Degreeobj.degreeName = temp[i].degreeName;
      Degreeobj.degreePeriod = temp[i].degreePeriod;
      for (let j = 0; j < temp[i].departments.length; j++) {
        let arr = temp[i].departments[j].courses;
        for (let k = 0; k < arr.length; k++) {
          if (Degreeobj.courses.includes(arr[k])) {

          }
          else {
            Degreeobj.courses.push(arr[k]);
          }
        }
      }
      temp2.push(Degreeobj);
    }
    setstorefcourse(temp2);
  }

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setDegree('');
    setDegreePeriod(0);
  }
  const handleClose2 = () => {
    setOpen2('');
    setDepartment('');
  }
  const handleClose3 = () => {
    setOpen3('');
    setCourse('');
    setCourseCode('');
    setselectedvalue([]);
    let temp = [...store];
    for (let i = 0; i < temp.length; i++) {
      temp[i].isDisabled = false;
    }
  }
  const handleOpen3 = (dname, degreeobj) => {
    const departments = degreeobj.departments;
    setselectedvalue([]);
    let ntemp = [];
    for (let i = 0; i < departments.length; i++) {
      let obj = {
        value: departments[i].departmentName,
        label: departments[i].departmentName,
      }
      ntemp.push(obj);
    }
    let temp = [...ntemp];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].value === dname) {
        temp[i].isDisabled = true;
      }
    }
    setstore(temp);
    setOpen3(dname);

  }
  const handleOpen5 = (courseobj) => {
    let departments = courseobj.Departments;
    let temp = [...store];
    for (let i = 0; i < temp.length; i++) {
      if (departments.includes(temp[i].value)) {
        temp[i].isDisabled = true;
      }
    }
    setstore(temp);
    setOpen5(courseobj.courseName + courseobj.courseCode);

  }
  const handleClose4 = () => {
    setOpen4('');
    setCourse('');
    setCourseCode('');
    setDepartment('');
    setselectedvalue([]);
  }
  const handleClose5 = () => {
    setDepartment('');
    setOpen5('');
    setselectedvalue([]);
    let temp = [...store];
    for (let i = 0; i < temp.length; i++) {
      temp[i].isDisabled = false;
    }
  }

  const AddDegree = () => {

    if (Degree === '') {
      seterror('Please enter Degree Name');
      setTimeout(() => {
        seterror('');
      }, 5000)
      return;
    }
    if (DegreePeroid <= 0) {
      seterror('Degree Period should be greater than 0');
      setTimeout(() => {
        seterror('');
      }, 5000)
      return;
    }
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].degreeName === Degree && storage[i].degreePeriod === DegreePeroid) {
        seterror('Degree Already Exist');
        setTimeout(() => {
          seterror('');
        }, 5000)
        return;
      }
    }
    let Degreeobj = {
      degreeName: Degree,
      degreePeriod: DegreePeroid,
      departments: [],
    }
    let temp = [...storage];
    temp.push(Degreeobj);
    setStorage(temp);
    handleCourseStorage();
    handleClose1();
  }
  const AddDepartment = (degreeobj) => {
    if (Department === '') {
      seterror2('Please enter Department Name');
      setTimeout(() => {
        seterror2('');
      }, 5000)
      return;
    }
    let temp = [...storage];
    let Departmentobj = {
      departmentName: Department,
      courses: [],
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          if (temp[i].departments[j].departmentName === Department) {
            seterror2('Department already exist');
            setTimeout(() => {
              seterror2('');
            }, 5000)
            return;
          }
        }
      }
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        temp[i].departments.push(Departmentobj);
      }
    }
    setStorage(temp);
    handleCourseStorage();
    handleClose2();
  }
  const AddCourse = (degree, department) => {
    if (Course === '') {
      seterror3('Please enter Course Name');
      setTimeout(() => {
        seterror3('');
      }, 5000)
      return;
    }
    if (CourseCode === '') {
      seterror3('Please enter Course Code');
      setTimeout(() => {
        seterror3('');
      }, 5000)
      return;
    }
    const temp = [...storage];
    const departmentsfc = [];
    for (let i = 0; i < selectedvalue.length; i++) {
      departmentsfc.push(selectedvalue[i].value);
    }
    departmentsfc.push(department);
    let courseobj = {
      courseName: Course,
      courseCode: CourseCode,
      Departments: departmentsfc,
    }



    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degree) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          const val = temp[i].departments[j].departmentName;
          if (departmentsfc.includes(val)) {
            let f = false;
            for (let k = 0; k < temp[i].departments[j].courses.length; k++) {
              let cobj = temp[i].departments[j].courses[k];
              if (cobj.courseName === Course && cobj.courseCode === CourseCode) {
                f = true;
                break;
              }
            }
            if (!f) {
              temp[i].departments[j].courses.push(courseobj);
            }

          }
        }
        break;
      }
    }

    setStorage(temp);
    handleCourseStorage();
    handleClose3();
  }
  const AddCourse2 = (degreeobj) => {
    if (Course === '') {
      seterror4('Please enter Course Name');
      setTimeout(() => {
        seterror4('');
      }, 5000)
      return;
    }
    if (CourseCode === '') {
      seterror4('Please enter Course Code');
      setTimeout(() => {
        seterror4('');
      }, 5000)
      return;
    }
    let courseobj = {
      courseName: Course,
      courseCode: CourseCode,
      Departments: [],
    }
    let temp = [...storage];
    let trig = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          let arr = temp[i].departments[j].courses;
          for (let k = 0; k < arr.length; k++) {
            if (arr[k].courseName === Course && arr[k].courseCode === CourseCode) {
              courseobj.Departments = [...arr[k].Departments];
              trig = true;
              break;
            }
          }
          if (trig) {
            break;
          }
        }
        if (trig) {
          break;
        }
      }
    }
    for (let i = 0; i < selectedvalue.length; i++) {
      if (courseobj.Departments.includes(selectedvalue[i].value)) {

      }
      else {
        courseobj.Departments.push(selectedvalue[i].value);
      }
    }
    if (Department !== '') {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
          for (let j = 0; j < temp[i].departments.length; j++) {
            if (temp[i].departments[j].departmentName === Department) {
              seterror4('Department Already Exist');
              setTimeout(() => {
                seterror4('');
              }, 5000)
              return;
            }
          }
          courseobj.Departments.push(Department);
          let Departmentobj = {
            departmentName: Department,
            courses: [],
          }
          temp[i].departments.push(Departmentobj);
        }
      }
    }

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          if (courseobj.Departments.includes(temp[i].departments[j].departmentName)) {
            let arr = temp[i].departments[j].courses;
            let checki = false;
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].courseName === Course && arr[k].courseCode === CourseCode) {
                arr[k].Departments = courseobj.Departments;
                checki = true;
                break;
              }
            }
            if (!checki) {
              temp[i].departments[j].courses.push(courseobj);
            }
          }


        }
      }
    }

    setStorage(temp);

    handleCourseStorage();
    handleClose4();
  }
  const AddDepartment2 = (degreeobj, courseobj) => {
    let tempcobj = courseobj;
    let temp = [...storage];

    for (let i = 0; i < selectedvalue.length; i++) {
      tempcobj.Departments.push(selectedvalue[i].value);
    }
    if (Department !== '') {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
          for (let j = 0; j < temp[i].departments.length; j++) {
            if (temp[i].departments[j].departmentName === Department) {
              seterror4('Department Already Exist');
              setTimeout(() => {
                seterror4('');
              }, 5000)
              return;
            }
          }
          courseobj.Departments.push(Department);
          let Departmentobj = {
            departmentName: Department,
            courses: [],
          }
          temp[i].departments.push(Departmentobj);
        }
      }
    }

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          if (tempcobj.Departments.includes(temp[i].departments[j].departmentName)) {
            let arr = temp[i].departments[j].courses;
            let checki = false;
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].courseName === tempcobj.courseName && arr[k].courseCode === tempcobj.courseCode) {
                arr[k].Departments = tempcobj.Departments;
                checki = true;
                break;
              }
            }
            if (!checki) {
              temp[i].departments[j].courses.push(tempcobj);
            }
          }


        }
      }
    }

    setStorage(temp);
    handleCourseStorage();
    handleClose5();
  }
  const handleDelclass = (degreeobj, courseobj) => {
    const temp = [...storage];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {

          let temp1 = temp[i].departments[j].courses;
          let temp2 = temp1.filter((course) => {
            return course !== courseobj;
          })
          temp[i].departments[j].courses = temp2;
        }
      }
    }
    setStorage(temp);
    handleCourseStorage();

  }
  const handleDeldept = (degreeobj, department) => {
    const temp = [...storage];
    let courses = [];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        let temp2 = [];
        for (let j = 0; j < temp[i].departments.length; j++) {
          if (temp[i].departments[j].departmentName === department) {
            courses = temp[i].departments[j].courses;
          }
          else {
            temp2.push(temp[i].departments[j]);
          }
        }
        temp[i].departments = temp2;
      }
    }


    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {
        for (let j = 0; j < temp[i].departments.length; j++) {
          for (let k = 0; k < courses.length; k++) {
            for (let p = 0; p < temp[i].departments[j].courses.length; p++) {
              if (temp[i].departments[j].courses[p] === courses[k]) {
                let ndepartments = courses[k].Departments.filter((departmentName) => {
                  return department !== departmentName;
                })
                temp[i].departments[j].courses[p].Departments = ndepartments;
              }
            }
          }
        }
      }
    }

    setStorage(temp);
    handleCourseStorage();

  }
  const handleDeldept2 = (degreeobj, department, courseobj) => {
    const temp = [...storage];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].degreeName === degreeobj.degreeName && temp[i].degreePeriod === degreeobj.degreePeriod) {

        for (let j = 0; j < temp[i].departments.length; j++) {
          if (temp[i].departments[j].courses.includes(courseobj)) {

            if (temp[i].departments[j].departmentName === department) {
              let newcourses = temp[i].departments[j].courses.filter((course) => {
                return course !== courseobj;
              })
              temp[i].departments[j].courses = newcourses;
            }
            else {
              let arr = [...temp[i].departments[j].courses];
              for (let p = 0; p < arr.length; p++) {
                if (arr[p] === courseobj) {
                  temp[i].departments[j].courses[p].Departments = arr[p].Departments.filter((departmentName) => {
                    return departmentName !== department;
                  })
                }
              }
            }
          }


        }

      }
    }
    setStorage(temp);
    handleCourseStorage();
  }
  return (
    <div className="d-flex justify-content-center w-100">
      <div className=" w-100 px-5 py-5 grey2b">
        <div>
          <span className="green1c fw-500 fs-14">Admin </span>
          <span className="fs-14">| Department </span>


        </div>
        <div className="bg-white my-2 shadow-lg position-relative">
          <div>
            <div className="d-flex justify-content-center fs-10 py-3 ">
              Configure the academic organization of Indian Institute of Technology Indian School of Mines here
            </div>
            <hr className='py-0 my-0 mx-4' />

            <div className="d-flex justify-content-between  px-2 ">
              <div className="fs-18 px-3 mt-4 ">All Courses</div>
              <div >
                <Button onClick={handleOpen1} sx={{ color: "#00ae57", mt: 3 }}>
                  <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ mx: 1 }} />{" "}
                  Add New Degree
                </Button>
                <Modal
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="d-flex justify-content-center">
                      <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                        <label>Degree Name</label>
                        <input value={Degree} onChange={(e) => { setDegree(e.target.value) }}
                          className="form-control shadow-none mb-2 border rounded-0"
                          type="text"
                        />

                        <label>Degree Period</label>
                        <input value={DegreePeroid} onChange={(e) => { setDegreePeriod(e.target.value) }}
                          className="form-control shadow-none mb-2 border rounded-0"
                          type="number"
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        className="greyButton AddButton px-4 py-2 m-3" onClick={AddDegree}>Add</Button>
                    </div>
                    {
                      (error !== '' && <div style={{ color: "red", fontSize: 14 }} className='d-flex justify-content-center'>{error}</div>)
                    }
                  </Box>
                </Modal>
              </div>

            </div>

            <hr className='py-0 my-0 mx-4' />

            <div className='d-flex px-2 mt:4'>

              {togglec === false ? <div className="d-flex"><RadioButtonUncheckedOutlinedIcon className="symbol" onClick={() => { settogglec(!togglec) }} fontSize="24" sx={{ mx: 1, color: "red", alignSelf: "center" }} />
                <label className="d-block" sx={{ color: "red" }}>
                  Department Mode
                </label> </div> :
                <div className="d-flex"><RadioButtonCheckedOutlinedIcon className="symbol" onClick={() => { settogglec(!togglec) }} fontSize="24" sx={{ mx: 1, color: "red", alignSelf: "center" }} />
                  <label className="d-block" sx={{ color: "red" }}>
                    Course Mode
                  </label> </div>}



            </div>
            {
              storage.length !== 0 &&

              storage.map((degreeobj) => (
                <div className="deg">
                  <div className="d-flex justify-content-between  px-2 ">
                    <div className="d-flex">
                      <KeyboardArrowDownOutlinedIcon fontSize="small" sx={{ mt: 4, mx: 1, color: "#7c7c7c" }} />
                      <label className="d-block Degree mt-4">
                        {degreeobj.degreeName}({degreeobj.degreePeriod} years)
                      </label>
                      <CreateOutlinedIcon className="symbol" fontSize="medium" sx={{ mt: 3.5, color: "#00ae57", mx: 1 }} />
                    </div>
                    {
                      togglec ?
                        <div>
                          <Button onClick={() => { setOpen4(degreeobj.degreeName + degreeobj.degreePeriod) }} sx={{ color: "#00ae57", mt: 3 }}>
                            <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ mx: 1 }} />{" "}
                            Add New Course
                          </Button>
                          <Modal
                            open={open4 === degreeobj.degreeName + degreeobj.degreePeriod ? true : false}
                            onClose={handleClose4}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <div className="d-flex justify-content-center">
                                <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                                  <label>Course Name</label>
                                  <input value={Course} onChange={(e) => { setCourse(e.target.value) }}
                                    className="form-control shadow-none mb-2 border rounded-0"
                                    type="text"
                                  />
                                  <label>Course Code</label>
                                  <input value={CourseCode} onChange={(e) => { setCourseCode(e.target.value) }}
                                    className="form-control shadow-none mb-2 border rounded-0"
                                    type="text"
                                  />
                                  <label>Departments for this course</label>
                                  <Select
                                    isMulti
                                    name="colors"
                                    options={store}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={(e) => { setselectedvalue(e) }}
                                  />
                                  <label>New Department Name</label>
                                  <input value={Department} onChange={(e) => { setDepartment(e.target.value) }}
                                    className="form-control shadow-none mb-2 border rounded-0"
                                    type="text"
                                  />


                                </div>
                              </div>
                              <div>
                                <Button
                                  className="greyButton AddButton px-4 py-2 m-3" onClick={() => { AddCourse2(degreeobj) }}>Add</Button>
                              </div>
                              {
                                (error4 !== '' && <div style={{ color: "red", fontSize: 14 }} className='d-flex justify-content-center'>{error4}</div>)
                              }
                            </Box>
                          </Modal>
                        </div>
                        :
                        <div>
                          <Button onClick={() => { setOpen2(degreeobj.degreeName + degreeobj.degreePeriod) }} sx={{ color: "#00ae57", mt: 3 }}>
                            <AddCircleOutlineOutlinedIcon fontSize="small" sx={{ mx: 1 }} />{" "}
                            Add New Department
                          </Button>
                          <Modal
                            open={open2 === degreeobj.degreeName + degreeobj.degreePeriod ? true : false}
                            onClose={handleClose2}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <div className="d-flex justify-content-center">
                                <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                                  <label>Department Name</label>
                                  <input value={Department} onChange={(e) => { setDepartment(e.target.value) }}
                                    className="form-control shadow-none mb-2 border rounded-0"
                                    type="text"
                                  />

                                </div>
                              </div>
                              <div>
                                <Button
                                  className="greyButton AddButton px-4 py-2 m-3" onClick={() => { AddDepartment(degreeobj) }}>Add</Button>
                              </div>
                              {
                                (error2 !== '' && <div style={{ color: "red", fontSize: 14 }} className='d-flex justify-content-center'>{error2}</div>)
                              }
                            </Box>
                          </Modal>
                        </div>
                    }


                  </div>
                  {
                    togglec ?
                      <div>
                        {
                          storefcourse.filter(e => e.degreeName === degreeobj.degreeName && e.degreePeriod === degreeobj.degreePeriod).map((degree) => (
                            <div className='departments mx-4'>
                              {degree.courses.length !== 0 && degree.courses.map((courseobj) => (
                                <div>
                                  <div>

                                    <div className='department'>
                                      <div className="d-flex ">
                                        <KeyboardArrowDownOutlinedIcon fontSize="24" sx={{ mx: 1, color: "#7c7c7c", alignSelf: "center" }} />
                                        <label className="d-block " sx={{ color: "black", fontWeight: "bold" }}>
                                          {courseobj.courseName}({courseobj.courseCode})
                                        </label>
                                        <CreateOutlinedIcon className="symbol" fontSize="24" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                        <AddBoxOutlinedIcon className="symbol" onClick={() => { handleOpen5(courseobj) }} fontSize="24" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                        <Modal
                                          open={open5 === courseobj.courseName + courseobj.courseCode ? true : false}
                                          onClose={handleClose5}
                                          aria-labelledby="modal-modal-title"
                                          aria-describedby="modal-modal-description"
                                        >
                                          <Box sx={style}>
                                            <div className="d-flex justify-content-center">
                                              <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                                                <label>New Department Name</label>
                                                <input value={Department} onChange={(e) => { setDepartment(e.target.value) }}
                                                  className="form-control shadow-none mb-2 border rounded-0"
                                                  type="text"
                                                />

                                                <label>Other departments for this course</label>
                                                <Select
                                                  isMulti
                                                  name="colors"
                                                  options={store}
                                                  className="basic-multi-select"
                                                  classNamePrefix="select"
                                                  onChange={(e) => { setselectedvalue(e) }}
                                                />

                                              </div>
                                            </div>
                                            <div>
                                              <Button onClick={() => { AddDepartment2(degreeobj, courseobj) }}
                                                className="greyButton AddButton px-4 py-2 m-3">Add</Button>
                                            </div>
                                            {
                                              (error5 !== '' && <div style={{ color: "red", fontSize: 14 }} className='d-flex justify-content-center'>{error5}</div>)
                                            }
                                          </Box>
                                        </Modal>
                                        <DeleteOutlineOutlinedIcon className="symbol" onClick={() => { handleDelclass(degreeobj, courseobj) }} fontSize="24" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    {
                                      courseobj.Departments.length !== 0 && <div className='branches mx-4'>
                                        {
                                          courseobj.Departments.map((department) => (
                                            <div className='branch'>
                                              <div className="d-flex ">
                                                <KeyboardArrowDownOutlinedIcon fontSize="10" sx={{ mx: 1, color: "#7c7c7c", alignSelf: "center" }} />
                                                <label className="d-block " sz={{ color: "#7c7c7c" }}>
                                                  {department}
                                                </label>
                                                <CreateOutlinedIcon className="symbol" fontSize="15" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                                <DeleteOutlineOutlinedIcon className="symbol" onClick={() => { handleDeldept2(degreeobj, department, courseobj) }} fontSize="10" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                              </div>
                                            </div>
                                          ))
                                        }
                                      </div>
                                    }
                                  </div>
                                </div>
                              )
                              )}
                            </div>
                          )
                          )
                        }

                      </div>

                      :
                      <div>
                        {degreeobj.departments.length !== 0 &&
                          <div className='departments mx-4'>{
                            degreeobj.departments.map((departmentobj) => (

                              <div>

                                <div className='department'>
                                  <div className="d-flex ">
                                    <KeyboardArrowDownOutlinedIcon fontSize="24" sx={{ mx: 1, color: "#7c7c7c", alignSelf: "center" }} />
                                    <label className="d-block " sx={{ color: "black", fontWeight: "bold" }}>
                                      {departmentobj.departmentName}
                                    </label>
                                    <CreateOutlinedIcon fontSize="24" className="symbol" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                    <AddBoxOutlinedIcon className="symbol" onClick={() => { handleOpen3(departmentobj.departmentName, degreeobj) }} fontSize="24" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                    <Modal
                                      open={open3 === departmentobj.departmentName ? true : false}
                                      onClose={handleClose3}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                    >
                                      <Box sx={style}>
                                        <div className="d-flex justify-content-center">
                                          <div className="RegistrationInputFields col-11 col-md-9 px-3 my-4 pt-2 pb-4">
                                            <label>Course Name</label>
                                            <input value={Course} onChange={(e) => { setCourse(e.target.value) }}
                                              className="form-control shadow-none mb-2 border rounded-0"
                                              type="text"
                                            />
                                            <label>Course Code</label>
                                            <input value={CourseCode} onChange={(e) => { setCourseCode(e.target.value) }}
                                              className="form-control shadow-none mb-2 border rounded-0"
                                              type="text"
                                            />
                                            <label>Other departments for this course</label>
                                            <Select
                                              isMulti
                                              name="colors"
                                              options={store}
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              onChange={(e) => { setselectedvalue(e) }}
                                            />

                                          </div>
                                        </div>
                                        <div>
                                          <Button onClick={() => { AddCourse(degreeobj.degreeName, departmentobj.departmentName) }}
                                            className="greyButton AddButton px-4 py-2 m-3">Add</Button>
                                        </div>
                                        {
                                          (error3 !== '' && <div style={{ color: "red", fontSize: 14 }} className='d-flex justify-content-center'>{error3}</div>)
                                        }
                                      </Box>
                                    </Modal>
                                    <DeleteOutlineOutlinedIcon className="symbol" onClick={() => { handleDeldept(degreeobj, departmentobj.departmentName) }} fontSize="24" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                  </div>



                                </div>
                                {
                                  departmentobj.courses.length !== 0 && <div className='branches mx-4'>
                                    {
                                      departmentobj.courses.map((courseobj) => (
                                        <div className='branch'>
                                          <div className="d-flex ">
                                            <KeyboardArrowDownOutlinedIcon fontSize="10" sx={{ mx: 1, color: "#7c7c7c", alignSelf: "center" }} />
                                            <label className="d-block " sz={{ color: "#7c7c7c" }}>
                                              {courseobj.courseName}({courseobj.courseCode})
                                            </label>
                                            <CreateOutlinedIcon className="symbol" fontSize="15" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                            <DeleteOutlineOutlinedIcon className="symbol" onClick={() => { handleDelclass(degreeobj, courseobj) }} fontSize="10" sx={{ color: "#00ae57", mx: 0.5, alignSelf: "center" }} />
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                }
                              </div>
                            ))}


                          </div>}
                      </div>
                  }


                </div>
              ))



            }


          </div>
        </div>

      </div>
    </div>

  )
}

export default Department