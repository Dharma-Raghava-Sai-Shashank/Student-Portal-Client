declare namespace Discipline {
    interface RootObject {
        disciplineId?: number,
        disciplineName: string,
        dept?: Department.RootObject,
        course?: Course.RootObject
    }
}