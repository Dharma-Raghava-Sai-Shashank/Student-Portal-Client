declare namespace Specialization{
    interface Response {
        courseId: number,
        courseName:string,
        departmentId: number,
        departmentName:string,
        specId: number,
        specName:string,
        disciplineName?: string,
        disciplineId?: number
    }

    interface RootObject {
        specId?: number,
        specName: string,
        discipline?: Discipline.RootObject
        disciplineId?: number
    }
}