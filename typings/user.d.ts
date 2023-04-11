declare enum Gender{
    MALE = "male",
    FEMALE = "female",
    OTHER = 'other'
}
declare enum Category{
    GENERAL = "Gen",
    SC = "SC",
    ST = 'ST',
    OBCNCL = 'OBC-NCL',
    OBC = 'OBC'
}

declare namespace User{
    interface AuthData {
        email?: string,
        username?: string,
        password: string,
        type?: string
    }

    interface Student{
        admno: string,
        category: string,
        cvs?: any,
        dob: string,
        first_name: string,
        middle_name: string,
        last_name: string,
        gender: Gender,
        instiMailId: string,
        personalMailId: string,
        phone: string,
        isEWS: number,
        isPWD: number,
        permissions: number,
        placementCycles?: any,
        specializations?: any,
        uidType: string,
        uidValue: string,
    }
    interface Response{
        success: boolean,
        studentData: Student
    }
}