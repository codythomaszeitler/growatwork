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
    achievements {
      items {
        id
        achievement
        owner
      }
      nextToken
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
    achievements {
      items {
        id
        achievement
        owner
      }
      nextToken
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
    achievements {
      items {
        id
        achievement
        owner
      }
      nextToken
    }
    owner
  }
}
`;
export const createAchievement = `mutation CreateAchievement(
  $input: CreateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  createAchievement(input: $input, condition: $condition) {
    id
    achievement
    accomplishedOn {
      utc
      timezone
    }
    careerImprovementClient {
      id
      username
      email
      achievements {
        nextToken
      }
      owner
    }
    owner
  }
}
`;
export const updateAchievement = `mutation UpdateAchievement(
  $input: UpdateAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  updateAchievement(input: $input, condition: $condition) {
    id
    achievement
    accomplishedOn {
      utc
      timezone
    }
    careerImprovementClient {
      id
      username
      email
      achievements {
        nextToken
      }
      owner
    }
    owner
  }
}
`;
export const deleteAchievement = `mutation DeleteAchievement(
  $input: DeleteAchievementInput!
  $condition: ModelAchievementConditionInput
) {
  deleteAchievement(input: $input, condition: $condition) {
    id
    achievement
    accomplishedOn {
      utc
      timezone
    }
    careerImprovementClient {
      id
      username
      email
      achievements {
        nextToken
      }
      owner
    }
    owner
  }
}
`;
