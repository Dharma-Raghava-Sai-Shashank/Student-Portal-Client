export const jobProfileData = [
    {
      id: 1,
      name: 'Google, India SDE',
      company: 'Google',
      type: 'Full-time',
      status: 'eligible',
      eligibilityCriteria: [
        {
          spec: {
            specId: 1,
            specName: 'Computer Science and Engineering',
          },
          minLPA: 15,
          maxLPA: 30,
          cgpaValue: 6.00,
        },
        {
          spec: {
            specId: 2,
            specName: 'Mechanical Engineering',
          },
          minLPA: 35,
          maxLPA: 50,
          cgpaValue: 6.00,
        },
      ],
    },
    {
      id: 2,
      name: 'Microsoft, India Software Development',
      company: 'Microsoft',
      type: 'Internship',
      status: 'ineligible',
      eligibilityCriteria: [
        {
          spec: {
            specId: 1,
            specName: 'Computer Science and Engineering',
          },
          minLPA: 15,
          maxLPA: 30,
          cgpaValue: 8.0,
        },
      ],
    },
    {
      id: 3,
      name: 'FutureFirst Data Analyst',
      company: 'FutureFirst',
      type: 'Full-time',
      status: 'eligible',
      eligibilityCriteria: [
        {
          spec: {
            specId: 1,
            specName: 'Computer Science and Engineering',
          },
          minLPA: 12,
          maxLPA: 25,
          cgpaValue: 7.5,
        },
        {
          spec: {
            specId: 3,
            specName: 'Electrical Engineering',
          },
          minLPA: 10,
          maxLPA: 20,
          cgpaValue: 7.0,
        },
      ],
    },
    {
      id: 4,
      name: 'Sprinkler Business Analyst',
      company: 'Sprinkler',
      type: 'Internship',
      status: 'applied',
      eligibilityCriteria: [
        {
          spec: {
            specId: 1,
            specName: 'Computer Science and Engineering',
          },
          minLPA: 10,
          maxLPA: 20,
          cgpaValue: 7.0,
        },
        {
          spec: {
            specId: 4,
            specName: 'Civil Engineering',
          },
          minLPA: 8,
          maxLPA: 15,
          cgpaValue: 6.5,
        },
      ],
    },
    {
      id: 5,
      name: 'StarBucks Data Analyst',
      company: 'StarBucks',
      type: 'Internship',
      status: 'eligible',
      eligibilityCriteria: [
        {
          spec: {
            specId: 1,
            specName: 'Computer Science and Engineering',
          },
          minLPA: 8,
          maxLPA: 15,
          cgpaValue: 7.0,
        },
        {
          spec: {
            specId: 5,
            specName: 'Mathematics and Computing',
          },
          minLPA: 6,
          maxLPA: 12,
          cgpaValue: 6.0,
        },
      ],
    },
  ];
  