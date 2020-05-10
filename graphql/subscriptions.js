/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCareerImprovementClient = `subscription OnCreateCareerImprovementClient($owner: String!) {
  onCreateCareerImprovementClient(owner: $owner) {
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
export const onUpdateCareerImprovementClient = `subscription OnUpdateCareerImprovementClient($owner: String!) {
  onUpdateCareerImprovementClient(owner: $owner) {
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
export const onDeleteCareerImprovementClient = `subscription OnDeleteCareerImprovementClient($owner: String!) {
  onDeleteCareerImprovementClient(owner: $owner) {
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
