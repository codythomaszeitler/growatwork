/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCareerImprovementClient = `query GetCareerImprovementClient($id: ID!) {
  getCareerImprovementClient(id: $id) {
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
export const listCareerImprovementClients = `query ListCareerImprovementClients(
  $filter: ModelCareerImprovementClientFilterInput
  $limit: Int
  $nextToken: String
) {
  listCareerImprovementClients(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      email
      achievements {
        nextToken
      }
      owner
    }
    nextToken
  }
}
`;
export const getAchievement = `query GetAchievement($id: ID!) {
  getAchievement(id: $id) {
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
export const listAchievements = `query ListAchievements(
  $filter: ModelAchievementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
        owner
      }
      owner
    }
    nextToken
  }
}
`;
