declare namespace PlacementCycle{
    interface RootObject {
        placementCycleId?: number,
        placementCycleName: string,
        type: string
        acadYear: AcademicYear.RootObject | undefined,
        startDate:string,
        endDate:string,
        specializations?: Specialization.RootObject,
        graduatingYear?: string
    }
}