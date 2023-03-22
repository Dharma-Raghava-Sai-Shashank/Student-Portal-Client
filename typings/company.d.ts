declare namespace Company{
    interface RootObject{
        companyId: number,
        companyName: string,
        companyWebsite: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null,
        companyCategoryId: number,
        companySectorId: number
    }

    interface Response extends RootObject{
        categoryName: string,
        categoryId: number,
        sectorId: number,
        sectorName: string
    }

    interface HR{
        hrContactId: number,
        hrContactName: string,
        emails: string,
        phones: string,
        linkedin: string,
        validityState: string
    }

    interface NF{
        applicationId: number,
        designation: string,
        placementCycleId: number,
        placementCycleName: string,
    }
}