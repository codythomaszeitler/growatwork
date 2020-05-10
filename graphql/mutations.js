/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCareerImprovementClient = `mutation CreateCareerImprovementClient(
  $input: CreateCareerImprovementClientInput!
  $condition: ModelCareerImprovementClientConditionInput
) {
  createCareerImprovementClient(input: $input, condition: $condition) {
    id
    username
    email
    accomplishments {
      accomplishment
      accomplishedOn {
        utc
        timezone
      }
    }
    goals {
      goal
      accomplishments {
        accomplishment
      }
    }
    owner
  }
}
`;
export const updateCareerImprovementClient = `mutation UpdateCareerImprovementClient(
  $input: UpdateCareerImprovementClientInput!
  $condition: ModelCareerImprovementClientConditionInput
) {
  updateCareerImprovementClient(input: $input, condition: $condition) {
    id
    username
    email
    accomplishments {
      accomplishment
      accomplishedOn {
        utc
        timezone
      }
    }
    goals {
      goal
      accomplishments {
        accomplishment
      }
    }
    owner
  }
}
`;
export const deleteCareerImprovementClient = `mutation DeleteCareerImprovementClient(
  $input: DeleteCareerImprovementClientInput!
  $condition: ModelCareerImprovementClientConditionInput
) {
  deleteCareerImprovementClient(input: $input, condition: $condition) {
    id
    username
    email
    accomplishments {
      accomplishment
      accomplishedOn {
        utc
        timezone
      }
    }
    goals {
      goal
      accomplishments {
        accomplishment
      }
    }
    owner
  }
}
`;
