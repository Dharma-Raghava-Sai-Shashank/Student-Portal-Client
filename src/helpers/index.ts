import moment from 'moment/moment';
import { Dispatch, SetStateAction } from 'react';

export const isOngoing = (startTime: string, endTime: string) => {
  const IsStartDateGone = moment().diff(moment(startTime)) >= 0;
  const IsEndDateGone = moment().diff(moment(endTime)) >= 0;

  return IsStartDateGone && !IsEndDateGone;
};

export const getData = (fieldValue: number, fieldName: string, dataList: any) => {
  return dataList.find((data: any) => data[fieldName] === fieldValue);
}

export const getCourseIds = (specializations: Specialization.Response[]) => {
  const courseIds : number[] = [];

  for(const i in specializations)
  {
    if(!courseIds.includes(specializations[i].courseId))
    courseIds.push(specializations[i].courseId);
  }

  return courseIds;
}

export const validateSelectedSpecsForCourses = (selectedIds: number[], Ids: number[]) => {
  const updatedSelects : number[] = [];

  for(const i in selectedIds)
  {
    if(Ids.includes(selectedIds[i]))
    updatedSelects.push(selectedIds[i]);
  }

  return updatedSelects;
}

export const isAllSelected = (selectedIds: number[], ids: number[]) => {
  if(selectedIds.length !== ids.length) return false;

  for(const i in selectedIds)
  {
    if(!ids.includes(selectedIds[i]))return false;
  }

  return true;
}

export const isSelected = (selectedIds: number[], id: number) => {
  return selectedIds.includes(id);
}

export const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>, itemId: number, setData: any) => {
  if(e.target?.checked){
    setData((prevData: number[]) => ([...prevData, itemId]));
  } else {
    setData((prevData: number[]) => prevData.filter((id: number) => id!==itemId));
  }
}
