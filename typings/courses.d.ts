declare namespace Course{
    interface Response {
        courseId: number,
        courseName:string,
        courseDuration:number,
    }

    interface RootObject {
        courseId?: number,
        courseName: string,
        duration: string,
    }
}