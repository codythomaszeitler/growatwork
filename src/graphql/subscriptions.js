/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCareerImprovementClient = `subscription OnCreateCareerImprovementClient($owner: String!) {
  onCreateCareerImprovementClient(owner: $owner) {
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
export const onUpdateCareerImprovementClient = `subscription OnUpdateCareerImprovementClient($owner: String!) {
  onUpdateCareerImprovementClient(owner: $owner) {
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
export const onDeleteCareerImprovementClient = `subscription OnDeleteCareerImprovementClient($owner: String!) {
  onDeleteCareerImprovementClient(owner: $owner) {
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
export const onCreateAchievement = `subscription OnCreateAchievement($owner: String!) {
  onCreateAchievement(owner: $owner) {
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
export const onUpdateAchievement = `subscription OnUpdateAchievement($owner: String!) {
  onUpdateAchievement(owner: $owner) {
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
export const onDeleteAchievement = `subscription OnDeleteAchievement($owner: String!) {
  onDeleteAchievement(owner: $owner) {
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
